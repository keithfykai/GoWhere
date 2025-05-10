function handleStars(rating) {
    if (rating >= 4.5) {
        return('⭐️⭐️⭐️⭐️⭐️');
    } else if (rating >= 4) {
        return('⭐️⭐️⭐️⭐️');
    } else if (rating >= 3.5) {
        return('⭐️⭐️⭐️⭐️');
    } else if (rating >= 3) {
        return('⭐️⭐️⭐️');
    } else if (rating >= 2.5) {
        return('⭐️⭐️⭐️');
    } else if (rating >= 2) {
        return('⭐️⭐️');
    } else if (rating >= 1.5) {
        return('⭐️⭐️');
    } else if (rating >= 1) {
        return('⭐️');
    } else {
        return('No Rating');
    }
}

export default handleStars;