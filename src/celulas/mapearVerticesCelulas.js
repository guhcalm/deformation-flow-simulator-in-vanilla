function mapearVerticesCelulas( celulas ) {
    console.log( "Mapeando Vertices das Celulas..." )
    //adicionando indice de faces conectadas aos pontos
    for ( let celula of celulas ) {
        let v1, v2, v3, v4, v5, v6, v7, v8
        for ( let ponto of celula.conexoes ) {
            let dx, dy, dz
            dx = celula.posicionamento.x - ponto.posicionamento.x
            dy = celula.posicionamento.y - ponto.posicionamento.y
            dz = celula.posicionamento.z - ponto.posicionamento.z
            ponto.face = []
            let fzy = ponto.face[0]
            let fzx = ponto.face[1]
            let fxy = ponto.face[2]

            if ( dx < 0 ) { fzy = ( 'zyf' ) } else { fzy = ( 'zyi' ) }
            if ( dy < 0 ) { fzx = ( 'zxf' ) } else { fzx = ( 'zxi' ) }
            if ( dz < 0 ) { fxy = ( 'xyf' ) } else { fxy = ( 'xyi' ) }
            
            if ( fzy == ( 'zyi' ) && fzx == ( 'zxf' ) && fxy == ( 'xyi' )  ) { v1 = ponto }
            if ( fzy == ( 'zyf' ) && fzx == ( 'zxf' ) && fxy == ( 'xyi' )  ) { v2 = ponto }
            if ( fzy == ( 'zyf' ) && fzx == ( 'zxi' ) && fxy == ( 'xyi' )  ) { v3 = ponto }
            if ( fzy == ( 'zyi' ) && fzx == ( 'zxi' ) && fxy == ( 'xyi' )  ) { v4 = ponto }
            if ( fzy == ( 'zyi' ) && fzx == ( 'zxf' ) && fxy == ( 'xyf' )  ) { v5 = ponto }
            if ( fzy == ( 'zyf' ) && fzx == ( 'zxf' ) && fxy == ( 'xyf' )  ) { v6 = ponto }
            if ( fzy == ( 'zyf' ) && fzx == ( 'zxi' ) && fxy == ( 'xyf' )  ) { v7 = ponto }
            if ( fzy == ( 'zyi' ) && fzx == ( 'zxi' ) && fxy == ( 'xyf' )  ) { v8 = ponto }
        }
        let vertices = [ v1, v2, v3, v4, v5, v6, v7, v8 ]

        // Dividir os vertices por coordenada
        let vX, vY, vZ, vU, vV, vW
        vX = []; vY = []; vZ = []; vU = []; vV = []; vW = []
        for ( let i in vertices ) {
            vX[i] = vertices[i].posicionamento.x
            vY[i] = vertices[i].posicionamento.y 
            vZ[i] = vertices[i].posicionamento.z 
            if ( vertices[i].vetor == null ) {} else {
                vU[i] = vertices[i].vetor.u 
                vV[i] = vertices[i].vetor.v 
                vW[i] = vertices[i].vetor.w 
            }
        }

        // adicionar coordenadas de vertices e vetores nas celulas
        if ( vertices[0].vetor == null ) {
            celula.vertices = { x: vX, y: vY, z: vZ }
            celula.vetores = null
        } else {
                celula.vertices = { x: vX, y: vY, z: vZ }
                celula.vetores = { u: vU, v: vV, w: vW }
        }
    }
    console.log( "... os vertices das Celulas foram mapeados." )
    return celulas
}
export default mapearVerticesCelulas

