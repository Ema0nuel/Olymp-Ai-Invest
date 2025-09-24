import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import supabase from '../../utils/supabaseClients'
import spinner from '../../utils/spinner'
import Modal from '../../components/Modal'
import toastify from '../../components/toastify'
import { trackPageVisit } from '../../utils/analtics'


const kyc = async () => {
    const authCheck = await auth.check('kyc')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Identity Verification')
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    // State
    let kycStatus = 'not_started'
    let userId = null
    let uploadedDocuments = new Set()

    // Fetch current KYC status
    async function fetchKycStatus() {
        try {
            spinner.start()
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            userId = user.id

            // Fetch both profile status and uploaded documents
            const [profileResult, documentsResult] = await Promise.all([
                supabase.from('profiles')
                    .select('kyc_status')
                    .eq('id', user.id)
                    .single(),
                supabase.from('kyc_documents')
                    .select('document_type')
                    .eq('user_id', user.id)
            ])

            if (profileResult.error) throw profileResult.error
            if (documentsResult.error) throw documentsResult.error

            kycStatus = profileResult.data.kyc_status
            uploadedDocuments = new Set(documentsResult.data.map(doc => doc.document_type))
            updateKycUI()
            updateUploadStatus()
        } catch (error) {
            console.error('KYC status error:', error)
        } finally {
            spinner.stop()
        }
    }

    // Update upload status indicators
    function updateUploadStatus() {
        const requiredDocs = ['id_front', 'id_back', 'selfie', 'address_proof']
        requiredDocs.forEach(docType => {
            const indicator = document.getElementById(`${docType}_status`)
            if (indicator) {
                if (uploadedDocuments.has(docType)) {
                    indicator.className = 'text-green-500'
                    indicator.innerHTML = '<i class="fas fa-check-circle"></i> Uploaded'
                } else {
                    indicator.className = 'text-gray-400'
                    indicator.innerHTML = 'Not uploaded'
                }
            }
        })

        // Update submit button state
        const submitBtn = document.getElementById('kycSubmitBtn')
        if (submitBtn) {
            const allUploaded = requiredDocs.every(doc => uploadedDocuments.has(doc))
            submitBtn.disabled = !allUploaded
            submitBtn.className = `w-full md:w-auto px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${allUploaded
                ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
                }`
        }
    }

    // Handle document upload
    async function handleDocumentUpload(file, type) {
        try {
            if (!file || !type) throw new Error('Invalid file or document type')

            spinner.start()

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('File size should not exceed 5MB')
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
            if (!allowedTypes.includes(file.type)) {
                throw new Error('Only JPG, PNG and PDF files are allowed')
            }

            // Upload document
            const filePath = `${userId}/kyc/${type}_${Date.now()}.${file.name.split('.').pop()}`
            const { error: uploadError } = await supabase.storage
                .from('deposit-screenshots')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('deposit-screenshots')
                .getPublicUrl(filePath)

            // Create KYC document record
            const { error: docError } = await supabase
                .from('kyc_documents')
                .insert({
                    user_id: userId,
                    document_type: type,
                    document_url: urlData.publicUrl
                })

            if (docError) throw docError

            uploadedDocuments.add(type)
            updateUploadStatus()

            toastify({
                text: 'Document uploaded successfully',
                background: 'bg-green-500'
            })

        } catch (error) {
            console.error('Upload error:', error)
            toastify({
                text: error.message,
                background: 'bg-red-500'
            })
        } finally {
            spinner.stop()
        }
    }

    // Handle KYC submission
    async function handleKycSubmit(e) {
        e.preventDefault()

        try {
            spinner.start()

            const requiredDocs = ['id_front', 'id_back', 'selfie', 'address_proof']
            const missingDocs = requiredDocs.filter(doc => !uploadedDocuments.has(doc))

            if (missingDocs.length > 0) {
                throw new Error(`Please upload all required documents. Missing: ${missingDocs.join(', ')}`)
            }

            // Update profile KYC status
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    kyc_status: 'pending',
                    kyc_submitted_at: new Date()
                })
                .eq('id', userId)

            if (updateError) throw updateError

            toastify({
                text: 'KYC submission successful! We will review your documents.',
                background: 'bg-green-500'
            })

            kycStatus = 'pending'
            updateKycUI()

        } catch (error) {
            console.error('KYC submission error:', error)
            toastify({
                text: error.message,
                background: 'bg-red-500'
            })
        } finally {
            spinner.stop()
        }
    }

    // Update KYC UI based on status
    function updateKycUI() {
        const statusElement = document.getElementById('kycStatus')
        const formElement = document.getElementById('kycForm')

        if (statusElement) {
            statusElement.className = `inline-flex items-center px-3 py-1 rounded-full text-sm ${kycStatus === 'approved' ? 'bg-green-500/20 text-green-500' :
                kycStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    kycStatus === 'rejected' ? 'bg-red-500/20 text-red-500' :
                        'bg-gray-500/20 text-gray-500'
                }`
            statusElement.innerHTML = `
                <i class="fas fa-${kycStatus === 'approved' ? 'check-circle' :
                    kycStatus === 'pending' ? 'clock' :
                        kycStatus === 'rejected' ? 'times-circle' :
                            'user-shield'
                } mr-2"></i>
                ${kycStatus.toUpperCase()}
            `
        }

        if (formElement) {
            formElement.style.display =
                (kycStatus === 'not_started' || kycStatus === 'rejected') ? 'block' : 'none'
        }
    }

    // Global handlers
    window.handleDocumentUpload = handleDocumentUpload
    window.handleKycSubmit = handleKycSubmit

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
                    <!-- KYC Header -->
                    <div class="text-center space-y-4">
                        <h1 class="text-2xl md:text-3xl font-bold text-white">Identity Verification</h1>
                        <p class="text-gray-400 max-w-2xl mx-auto">
                            Complete your identity verification to unlock full trading capabilities
                            and higher withdrawal limits.
                        </p>
                        <div id="kycStatus" class="inline-flex items-center px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-spinner fa-spin mr-2"></i>Loading...
                        </div>
                    </div>

                    <!-- KYC Form -->
                    <form id="kycForm" class="space-y-8 pb-14 lg:pb-0" onsubmit="handleKycSubmit(event)">
                        <!-- ID Verification -->
                        <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-6 space-y-4">
                            <h3 class="text-lg font-medium text-white">Government ID Verification</h3>
                            
                            <!-- ID Front -->
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        ID Front Side
                                    </label>
                                    <span id="id_front_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*"
                                       onchange="handleDocumentUpload(this.files[0], 'id_front')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>

                            <!-- ID Back -->
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        ID Back Side
                                    </label>
                                    <span id="id_back_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*"
                                       onchange="handleDocumentUpload(this.files[0], 'id_back')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <!-- Selfie Verification -->
                        <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-6 space-y-4">
                            <h3 class="text-lg font-medium text-white">Selfie Verification</h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        Take a clear selfie holding your ID
                                    </label>
                                    <span id="selfie_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*"
                                       onchange="handleDocumentUpload(this.files[0], 'selfie')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <!-- Address Verification -->
                        <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-6 space-y-4">
                            <h3 class="text-lg font-medium text-white">Proof of Address</h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        Upload a recent utility bill or bank statement
                                    </label>
                                    <span id="address_proof_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*,.pdf"
                                       onchange="handleDocumentUpload(this.files[0], 'address_proof')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <button id="kycSubmitBtn"
                                type="submit"
                                disabled
                                class="w-full md:w-auto px-8 py-4 bg-gray-500/50 text-gray-400 rounded-xl cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                            <i class="fas fa-shield-alt"></i>
                            Submit Documents for Verification
                        </button>
                    </form>

                    <!-- Status Display for Approved/Pending -->
                    ${kycStatus === 'approved' ? `
                        <div class="text-center space-y-4">
                            <div class="text-6xl text-green-500">
                                <i class="fas fa-shield-check"></i>
                            </div>
                            <h2 class="text-xl font-medium text-white">Verification Complete</h2>
                            <p class="text-gray-400">Your identity has been verified successfully</p>
                        </div>
                    ` : kycStatus === 'pending' ? `
                        <div class="text-center space-y-4">
                            <div class="text-6xl text-yellow-500">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h2 class="text-xl font-medium text-white">Verification in Progress</h2>
                            <p class="text-gray-400">We are reviewing your documents. This usually takes 1-2 business days.</p>
                        </div>
                    ` : ''}
                </div>
            </main>
        `,
        pageEvents: () => {
            navEvents()
            fetchKycStatus()
        }
    }
}

export default kyc