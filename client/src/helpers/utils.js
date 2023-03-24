export const animalSize = (size) => {
        
    let text = '';
    if(size === 'small') {
        text = 'Petit toutou (moins de 10kg)'
    } else if(size === 'medium') {
        text = 'Moyen toutou (entre 10kg et 25kg)'
    } else {
        text = 'Grand toutou (plus de 25kg)'
    }

    return text;
}