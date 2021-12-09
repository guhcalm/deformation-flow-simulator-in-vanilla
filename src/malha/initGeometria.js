function initGeometria( parametros ) {
    let Dx, Dy, Dz, Tx, Ty, Tz
    Dx = parametros.dimensoes.x
    Dy = parametros.dimensoes.y
    Dz = parametros.dimensoes.z
    Tx = parametros.discretizador.x
    Ty = parametros.discretizador.y
    Tz = parametros.discretizador.z

    let lx, ly, lz, dm
    dm = 10 
    lx = Dx * dm
    ly = Dy * dm
    lz = Dz * dm
    
    let dx, dy, dz, dimensoes, unidades
    unidades = { x: Tx, y: Ty, z: Tz }
    dx = lx / Tx
    dy = ly / Ty
    dz = lz / Tz
    dimensoes = { totais: { x: lx, y: ly, z: lz }, discretas: { x: dx, y: dy, z: dz } }

    let malha = { unidades, dimensoes }
    return malha  
}

export default initGeometria