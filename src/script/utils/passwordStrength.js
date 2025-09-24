export function checkPasswordStrength(password) {
    let strength = 0;
    const indicators = [];

    // Length check
    if (password.length >= 8) {
        strength += 25;
        indicators.push('Length');
    }

    // Contains number
    if (/\d/.test(password)) {
        strength += 25;
        indicators.push('Number');
    }

    // Contains letter
    if (/[a-zA-Z]/.test(password)) {
        strength += 25;
        indicators.push('Letter');
    }

    // Contains special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 25;
        indicators.push('Special');
    }

    return {
        strength,
        color: strength <= 25 ? 'bg-red-500' :
            strength <= 50 ? 'bg-yellow-500' :
                strength <= 75 ? 'bg-blue-500' :
                    'bg-green-500',
        indicators
    };
}