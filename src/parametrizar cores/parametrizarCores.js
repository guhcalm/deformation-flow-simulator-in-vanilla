function parametrizarCores( min, max, ut ) {
    let t = 1 - ( ( max - ut )/( max + min ) )

    let azul     = { r:   0, g:   0, b: 1 }
    let ciano    = { r:   0, g: 1, b: 1 }
    let verde    = { r:   0, g: 1, b:  0 }
    let amarelo  = { r: 1, g: 1, b:   0 }
    let vermelho = { r: 1, g:   0, b: 0 }
    let magenta  = { r: 1, g:   0, b: 1 }
    let intervalo = 1 / 6
    let cor

    if ( t >= 0 && t < 1 * intervalo ) {
        let pos = (t - 0 * intervalo) / intervalo
        cor = interpolarCor(azul, magenta, pos, t)
    }
    if ( t >= 1 * intervalo && t < 2 * intervalo ) {
        let pos = (t - 1 * intervalo) / intervalo
        cor = interpolarCor(azul, ciano, pos, t)
    }
    if ( t >= 2 * intervalo && t < 3 * intervalo ) {
        let pos = (t - 2 * intervalo) / intervalo
        cor = interpolarCor(ciano, verde, pos, t)    
    }
    if ( t >= 3 * intervalo && t <= 4 * intervalo ) { 
        let pos = (t - 3 * intervalo) / intervalo
        cor = interpolarCor(verde, amarelo, pos, t)   
    }
    if ( t > 4 * intervalo && t <= 5 * intervalo ) { 
        let pos = (t - 4 * intervalo) / intervalo
        cor = interpolarCor(amarelo, vermelho, pos, t)
    }
    if ( t > 5 * intervalo && t <= 6 * intervalo ) { 
        let pos = (t - 5 * intervalo) / intervalo
        cor = interpolarCor(vermelho, magenta, pos, t)
    }
    return cor
}
function interpolarCor( cor1, cor2, pos, t ) {
    let r = cor1.r + pos * (cor2.r - cor1.r)
    let g = cor1.g + pos * (cor2.g - cor1.g)
    let b = cor1.b + pos * (cor2.b - cor1.b)

    return { r, g, b, t }
}

export default parametrizarCores



