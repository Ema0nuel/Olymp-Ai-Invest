import toastify from '../components/toastify';

export function handleError(error, customMessage = null) {
    console.error('Error:', error);

    toastify({
        text: customMessage || error.message || 'An error occurred',
        background: 'bg-red-500'
    });
}