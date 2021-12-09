import * as THREE from './three.module.js'
// instanciando metodos ambiente
import initCanvas from './src/Ambiente 3D/initCanvas.js'
import initCamera from './src/Ambiente 3D/initCamera.js'
import initCena from './src/Ambiente 3D/initCena.js'
import initIluminar from './src/Ambiente 3D/initIluminar.js'
import initRenderer from './src/Ambiente 3D/initRenderer.js'
// instanciando metodos malha
import initGeometria from './src/malha/initGeometria.js'
import posicionarMalha from './src/malha/posicionarMalha.js'
// instanciando metodos vertices
import initPontos from './src/vertices/initPontos.js'
import addConexoesPontos from './src/vertices/addConexoesPontos.js'
import deformarPontos from './src/vertices/deformarPontos.js'
import adicionarCoresNosPontos from './src/vertices/adicionarCoresNosPontos.js'
import adicionarVetoresNosPontos from './src/vertices/adicionarVetoresNosPontos.js'
import desenharPontos from './src/vertices/desenharPontos.js'
import desenharVetores from './src/vertices/desenharVetores.js'
// instanciando metodos conexoes
import initConexoes from './src/conexoes/initConexoes.js'
import desenharConexoes from './src/conexoes/desenharConexoes.js'
// instanciando metodos celulas
import initCelulas from './src/celulas/initCelulas.js'
import desenharCelulas from './src/celulas/desenharCelulas.js'
import addConexoesCelulas from './src/celulas/addConexoesCelulas.js'
import mapearVerticesCelulas from './src/celulas/mapearVerticesCelulas.js'
import refinamentoCelulas from './src/celulas/refinamentoCelulas.js'
import desenharGradiente from './src/celulas/desenharGradiente.js'
// instanciando metodos de calculo
import initMatrizes from './initMatrizes.js'
// instanciando metodos de fluxo
import initAgentes from './src/fluxo/initAgentes.js'
// instanciar interface
import criarElemento from './src/interface/criarElemento.js'
import initNav from './src/interface/initNav.js'
import initSliders from './src/interface/initSliders.js'
import initGradienteInputs from './src/interface/initGradienteInputs.js'
import initBefore from './src/interface/initBefore.js'
import navegarPontos from './src/interface/navegarPontos.js'


// Declaração de variaveis
let parametros = { 
    dimensoes: { x: 1, y: 1, z: 1 },
    discretizador: { x: 1, y: 1, z: 1 },
    refinamento: { x: 1, y: 1, z: 1 },
    mostrarPontos: true,
    mostrarLinhas: true,
    calcular: 2,
    gradiente: 2,
    fluxo: 2,
    deformar: 2,
    refinar: 2,
    visibilidade: { v1: true, v2: true, v3: true, v4: true, v5: true, v6: true },
    etapas: [
        { titulo: 'Discretização', conteudo: null },
        { titulo: 'Dimensionamento', conteudo: null },
        { titulo: 'Isovalores', conteudo: null },
        { titulo: 'Fluxo', conteudo: null },
        { titulo: 'Deformação', conteudo: null }
    ],
    rodar: { x: .004, y: .004, z: .004 },
    tela: { x: null, y: null, z: null },
    mode: null,
    rigidez: null, 
    cfg: 3,
}
let canvas, camera, cena, renderer, group, estrutura, esferas
let malha, pontos, conexoes, celulas, agentes, malhaCelulas, matrizes, cameraZ
let body = document.body
let nav, navItens, navLinks, next, before, bottom, form
let f, u

// App principal
init()
function init() {
    initEnv()
    ajustarMalha()
    initInterface( body, parametros )
    window.addEventListener( 'resize', resize )
    loop()
}
function loop() {
    group.rotation.y += parametros.rodar.x
    group.rotation.x += parametros.rodar.y
    group.rotation.z += parametros.rodar.z
    render()
    
    if ( agentes != null ) {
        for ( let agente of agentes ) {
            let max = agente.path.length * 6
            agente.way += agente.passo
            agente.mesh.geometry.setDrawRange( 0, agente.way )
            if ( agente.way >= max ) {
                agente.way = 0
            }
        }
}
    requestAnimationFrame( loop )
}

// Ferramentas de Modelagem
function ajustarMalha() {
    parametros.refinamento.x = parametros.refinamento.y = parametros.refinamento.z = 1
    cena = initCena()
    initIluminar( cena )
    malha = initGeometria( parametros )
    matrizes = null
    
    if ( parametros.mode == 'manual' ) {
        if ( parametros.cfg == 5 ) {
            pontos = [ 
                { identificador: 0, posicionamento: { x: 45, y: 0, z: 0 }, conexoes: { identificador: [1, 2, 3] }, vetor: null, cor: null },
                { identificador: 1, posicionamento: { x: 0, y: 60, z: 0 }, conexoes: { identificador: [0] }, vetor: null, cor: null },
                { identificador: 2, posicionamento: { x: 125, y: 60, z: 0 }, conexoes: { identificador: [0] }, vetor: null, cor: null },
                { identificador: 3, posicionamento: { x: 90, y: 60, z: 0 }, conexoes: { identificador: [0] }, vetor: null, cor: null }
            ]
            f = [
                { identificador: 0, x: 0, y: -1800000, z: 0 },
                { identificador: 1, x: 0, y: 0, z: 0 },
                { identificador: 2, x: 0, y: 0, z: 0 },
                { identificador: 3, x: 0, y: 0, z: 0 }
            ]
            u = [
                { identificador: 0, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 1, u: 0, v: 0, w: 0 },
                { identificador: 2, u: 0, v: 0, w: 0 },
                { identificador: 3, u: 0, v: 0, w: 0 }
            ]
            parametros.rigidez = { A: 250, E:200*(1000) }
        }
        if ( parametros.cfg == 3 ) {
            pontos = [ 
                { identificador: 0, posicionamento: { x: 0, y: 0, z: 0 }, conexoes: { identificador: [1, 2] }, vetor: null, cor: null },
                { identificador: 1, posicionamento: { x: 10, y: 10, z: 0 }, conexoes: { identificador: [0,2] }, vetor: null, cor: null },
                { identificador: 2, posicionamento: { x: 20, y: 0, z: 0 }, conexoes: { identificador: [0,1] }, vetor: null, cor: null }
            ]
            f = [
                { identificador: 0, x: 0, y: -1800000, z: 0 },
                { identificador: 1, x: 0, y: 0, z: 0 },
                { identificador: 2, x: 0, y: 0, z: 0 }
            ]
            u = [
                { identificador: 0, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 1, u: 0, v: 0, w: 0 },
                { identificador: 2, u: 0, v: 0, w: 0 }
            ]
            parametros.rigidez = { A: 250, E:200*(1000) }
        }
        if ( parametros.cfg == 1 ) {
            pontos = [ 
                { 
                    identificador: 0, 
                    posicionamento: { x: 43.3, y: 8.216, z: 51.2971 }, 
                    conexoes: { identificador: [ 1, 2, 3, 4, 5, 6 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 1, 
                    posicionamento: { x: 30.8, y: 6.216, z: 71.6492 }, 
                    conexoes: { identificador: [ 0, 2, 6, 7, 12 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 2, 
                    posicionamento: { x: 55.8, y: 6.216, z: 71.6492 }, 
                    conexoes: { identificador: [ 0, 1, 3, 7, 8 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 3, 
                    posicionamento: { x: 68.3, y: 6.216, z: 51.2971 }, 
                    conexoes: { identificador: [ 0, 2, 4, 8, 9 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 4, 
                    posicionamento: { x: 55.8, y: 6.216, z: 28.3479 }, 
                    conexoes: { identificador: [ 0, 3, 5, 9, 10 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 5, 
                    posicionamento: { x: 30.8, y: 6.216, z: 28.3479 }, 
                    conexoes: { identificador: [ 0, 4, 6, 10, 11 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 6, 
                    posicionamento: { x: 18.3, y: 6.216, z: 51.2971 }, 
                    conexoes: { identificador: [ 0, 1, 5, 11, 12 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 7, 
                    posicionamento: { x: 43.3, y: 0, z: 99.9971 }, 
                    conexoes: { identificador: [ 1, 2 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 8, 
                    posicionamento: { x: 86.6, y: 0, z: 74.9978 }, 
                    conexoes: { identificador: [ 2, 3 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 9, 
                    posicionamento: { x: 86.6, y: 0, z: 24.9993 }, 
                    conexoes: { identificador: [ 3, 4 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 10, 
                    posicionamento: { x: 43.3, y: 0, z: 0 }, 
                    conexoes: { identificador: [ 4, 5 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 11, 
                    posicionamento: { x: 0, y: 0, z: 24.9993 }, 
                    conexoes: { identificador: [ 5, 6 ] }, 
                    vetor: null, cor: null
                },
                { 
                    identificador: 12, 
                    posicionamento: { x: 0, y: 0, z: 74.9978 }, 
                    conexoes: { identificador: [ 1, 6 ] }, 
                    vetor: null, cor: null
                },
    
            ]
            f = [
                { identificador: 0, x: 0, y: -7.81, z: 0 },
                { identificador: 1, x: 0, y: 0, z: 0 },
                { identificador: 2, x: 0, y: 0, z: 0 },
                { identificador: 3, x: 0, y: 0, z: 0 },
                { identificador: 4, x: 0, y: 0, z: 0 },
                { identificador: 5, x: 0, y: 0, z: 0 },
                { identificador: 6, x: 0, y: 0, z: 0 },
                { identificador: 7, x: 0, y: 0, z: 0 },
                { identificador: 8, x: 0, y: 0, z: 0 },
                { identificador: 9, x: 0, y: 0, z: 0 },
                { identificador: 10, x: 0, y: 0, z: 0 },
                { identificador: 11, x: 0, y: 0, z: 0 },
                { identificador: 12, x: 0, y: 0, z: 0 }
            ]
            u = [
                { identificador: 0, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 1, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 2, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 3, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 4, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 5, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 6, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 7, u: 0, v: 0, w: 0 },
                { identificador: 8, u: 0, v: 0, w: 0 },
                { identificador: 9, u: 0, v: 0, w: 0 },
                { identificador: 10, u: 0, v: 0, w: 0 },
                { identificador: 11, u: 0, v: 0, w: 0 },
                { identificador: 12, u: 0, v: 0, w: 0 }
            ]
            parametros.rigidez = { A: 1, E: 10**4 }
        }
        if ( parametros.cfg == 2 ) {
            pontos = [
                {
                    'identificador': 0,
                    'posicionamento': {
                        'x': 0,
                        'y': 179.022,
                        'z': 0
                    },
                    'conexoes': {
                        'identificador': [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 1,
                    'posicionamento': {
                        'x': 0,
                        'y': 156.947,
                        'z': 86.7
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            2,
                            24,
                            25,
                            26
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 2,
                    'posicionamento': {
                        'x': 22.4396,
                        'y': 156.947,
                        'z': 83.7458
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            1,
                            3,
                            26,
                            27
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 3,
                    'posicionamento': {
                        'x': 43.95,
                        'y': 156.947,
                        'z': 75.0844
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            2,
                            4,
                            27,
                            28
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 4,
                    'posicionamento': {
                        'x': 61.3062,
                        'y': 156.947,
                        'z': 61.3062
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            3,
                            5,
                            28,
                            29
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 5,
                    'posicionamento': {
                        'x': 75.0844,
                        'y': 156.947,
                        'z': 43.95
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            4,
                            6,
                            29,
                            30
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 6,
                    'posicionamento': {
                        'x': 83.7458,
                        'y': 156.947,
                        'z': 22.4396
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            5,
                            7,
                            30,
                            31
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 7,
                    'posicionamento': {
                        'x': 86.7,
                        'y': 156.947,
                        'z': 0
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            6,
                            8,
                            31,
                            32
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 8,
                    'posicionamento': {
                        'x': 83.7458,
                        'y': 156.947,
                        'z': -22.4396
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            7,
                            9,
                            32,
                            33
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 9,
                    'posicionamento': {
                        'x': 75.0844,
                        'y': 156.947,
                        'z': -43.95
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            8,
                            10,
                            33,
                            34
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 10,
                    'posicionamento': {
                        'x': 61.3062,
                        'y': 156.947,
                        'z': -61.3062
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            9,
                            11,
                            34,
                            35
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 11,
                    'posicionamento': {
                        'x': 43.95,
                        'y': 156.947,
                        'z': -75.0844
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            10,
                            12,
                            35,
                            36
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 12,
                    'posicionamento': {
                        'x': 22.4396,
                        'y': 156.947,
                        'z': -83.7458
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            11,
                            13,
                            36,
                            37
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 13,
                    'posicionamento': {
                        'x': 0,
                        'y': 156.947,
                        'z': -86.7
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            12,
                            14,
                            37,
                            38
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 14,
                    'posicionamento': {
                        'x': -22.4396,
                        'y': 156.947,
                        'z': -83.7458
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            13,
                            15,
                            38,
                            39
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 15,
                    'posicionamento': {
                        'x': -43.95,
                        'y': 156.947,
                        'z': -75.0844
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            14,
                            16,
                            39,
                            40
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 16,
                    'posicionamento': {
                        'x': -61.3062,
                        'y': 156.947,
                        'z': -61.3062
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            15,
                            17,
                            40,
                            41
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 17,
                    'posicionamento': {
                        'x': -75.0844,
                        'y': 156.947,
                        'z': -43.95
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            16,
                            18,
                            41,
                            42
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 18,
                    'posicionamento': {
                        'x': -83.7458,
                        'y': 156.947,
                        'z': -22.4396
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            17,
                            19,
                            42,
                            43
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 19,
                    'posicionamento': {
                        'x': -86.7,
                        'y': 156.947,
                        'z': 0
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            18,
                            20,
                            43,
                            44
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 20,
                    'posicionamento': {
                        'x': -83.7458,
                        'y': 156.947,
                        'z': 22.4396
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            19,
                            21,
                            44,
                            45
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 21,
                    'posicionamento': {
                        'x': -75.0844,
                        'y': 156.947,
                        'z': 43.95
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            20,
                            22,
                            45,
                            46
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 22,
                    'posicionamento': {
                        'x': -61.3062,
                        'y': 156.947,
                        'z': 61.3062
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            21,
                            23,
                            46,
                            47
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 23,
                    'posicionamento': {
                        'x': -43.95,
                        'y': 156.947,
                        'z': 75.0844
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            22,
                            24,
                            47,
                            48
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 24,
                    'posicionamento': {
                        'x': -22.4396,
                        'y': 156.947,
                        'z': 83.7458
                    },
                    'conexoes': {
                        'identificador': [
                            0,
                            1,
                            23,
                            25,
                            48
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 25,
                    'posicionamento': {
                        'x': -23.5684,
                        'y': 94.083,
                        'z': 179.02
                    },
                    'conexoes': {
                        'identificador': [
                            1,
                            24,
                            26,
                            48,
                            49,
                            72
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 26,
                    'posicionamento': {
                        'x': 23.5684,
                        'y': 94.083,
                        'z': 179.02
                    },
                    'conexoes': {
                        'identificador': [
                            1,
                            2,
                            25,
                            27,
                            49,
                            50
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 27,
                    'posicionamento': {
                        'x': 69.0991,
                        'y': 94.083,
                        'z': 166.8201
                    },
                    'conexoes': {
                        'identificador': [
                            2,
                            3,
                            26,
                            28,
                            50,
                            51
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 28,
                    'posicionamento': {
                        'x': 109.9209,
                        'y': 94.083,
                        'z': 143.2517
                    },
                    'conexoes': {
                        'identificador': [
                            3,
                            4,
                            27,
                            29,
                            51,
                            52
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 29,
                    'posicionamento': {
                        'x': 143.2517,
                        'y': 94.083,
                        'z': 109.9209
                    },
                    'conexoes': {
                        'identificador': [
                            4,
                            5,
                            28,
                            30,
                            52,
                            53
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 30,
                    'posicionamento': {
                        'x': 166.8201,
                        'y': 94.083,
                        'z': 69.0991
                    },
                    'conexoes': {
                        'identificador': [
                            5,
                            6,
                            29,
                            31,
                            53,
                            54
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 31,
                    'posicionamento': {
                        'x': 179.02,
                        'y': 94.083,
                        'z': 23.5684
                    },
                    'conexoes': {
                        'identificador': [
                            6,
                            7,
                            30,
                            32,
                            54,
                            55
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 32,
                    'posicionamento': {
                        'x': 179.02,
                        'y': 94.083,
                        'z': -23.5684
                    },
                    'conexoes': {
                        'identificador': [
                            7,
                            8,
                            31,
                            33,
                            55,
                            56
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 33,
                    'posicionamento': {
                        'x': 166.8201,
                        'y': 94.083,
                        'z': -69.0991
                    },
                    'conexoes': {
                        'identificador': [
                            8,
                            9,
                            32,
                            34,
                            56,
                            57
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 34,
                    'posicionamento': {
                        'x': 143.2517,
                        'y': 94.083,
                        'z': -109.9209
                    },
                    'conexoes': {
                        'identificador': [
                            9,
                            10,
                            33,
                            35,
                            57,
                            58
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 35,
                    'posicionamento': {
                        'x': 109.9209,
                        'y': 94.083,
                        'z': -143.2517
                    },
                    'conexoes': {
                        'identificador': [
                            10,
                            11,
                            34,
                            36,
                            58,
                            59
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 36,
                    'posicionamento': {
                        'x': 69.0991,
                        'y': 94.083,
                        'z': -166.8201
                    },
                    'conexoes': {
                        'identificador': [
                            11,
                            12,
                            35,
                            37,
                            59,
                            60
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 37,
                    'posicionamento': {
                        'x': 23.5684,
                        'y': 94.083,
                        'z': -179.02
                    },
                    'conexoes': {
                        'identificador': [
                            12,
                            13,
                            36,
                            38,
                            60,
                            61
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 38,
                    'posicionamento': {
                        'x': -23.5684,
                        'y': 94.083,
                        'z': -179.02
                    },
                    'conexoes': {
                        'identificador': [
                            13,
                            14,
                            37,
                            39,
                            61,
                            62
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 39,
                    'posicionamento': {
                        'x': -69.0991,
                        'y': 94.083,
                        'z': -166.8201
                    },
                    'conexoes': {
                        'identificador': [
                            14,
                            15,
                            38,
                            40,
                            62,
                            63
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 40,
                    'posicionamento': {
                        'x': -109.9209,
                        'y': 94.083,
                        'z': -143.2517
                    },
                    'conexoes': {
                        'identificador': [
                            15,
                            16,
                            39,
                            41,
                            63,
                            64
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 41,
                    'posicionamento': {
                        'x': -143.2517,
                        'y': 94.083,
                        'z': -109.9209
                    },
                    'conexoes': {
                        'identificador': [
                            16,
                            17,
                            40,
                            42,
                            64,
                            65
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 42,
                    'posicionamento': {
                        'x': -166.8201,
                        'y': 94.083,
                        'z': -69.0991
                    },
                    'conexoes': {
                        'identificador': [
                            17,
                            18,
                            41,
                            43,
                            65,
                            66
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 43,
                    'posicionamento': {
                        'x': -179.02,
                        'y': 94.083,
                        'z': -23.5684
                    },
                    'conexoes': {
                        'identificador': [
                            18,
                            19,
                            42,
                            44,
                            66,
                            67
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 44,
                    'posicionamento': {
                        'x': -179.02,
                        'y': 94.083,
                        'z': 23.5684
                    },
                    'conexoes': {
                        'identificador': [
                            19,
                            20,
                            43,
                            45,
                            67,
                            68
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 45,
                    'posicionamento': {
                        'x': -166.8201,
                        'y': 94.083,
                        'z': 69.0991
                    },
                    'conexoes': {
                        'identificador': [
                            20,
                            21,
                            44,
                            46,
                            68,
                            69
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 46,
                    'posicionamento': {
                        'x': -143.2517,
                        'y': 94.083,
                        'z': 109.9209
                    },
                    'conexoes': {
                        'identificador': [
                            21,
                            22,
                            45,
                            47,
                            69,
                            70
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 47,
                    'posicionamento': {
                        'x': -109.9209,
                        'y': 94.083,
                        'z': 143.2517
                    },
                    'conexoes': {
                        'identificador': [
                            22,
                            23,
                            46,
                            48,
                            70,
                            71
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 48,
                    'posicionamento': {
                        'x': -69.0991,
                        'y': 94.083,
                        'z': 166.8201
                    },
                    'conexoes': {
                        'identificador': [
                            23,
                            24,
                            25,
                            47,
                            71,
                            72
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 49,
                    'posicionamento': {
                        'x': 0,
                        'y': 0,
                        'z': 265.72
                    },
                    'conexoes': {
                        'identificador': [
                            25,
                            26,
                            50,
                            72
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 50,
                    'posicionamento': {
                        'x': 68.7734,
                        'y': 0,
                        'z': 256.6658
                    },
                    'conexoes': {
                        'identificador': [
                            26,
                            27,
                            49,
                            51
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 51,
                    'posicionamento': {
                        'x': 132.86,
                        'y': 0,
                        'z': 230.1203
                    },
                    'conexoes': {
                        'identificador': [
                            27,
                            28,
                            50,
                            52
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 52,
                    'posicionamento': {
                        'x': 187.8924,
                        'y': 0,
                        'z': 187.8924
                    },
                    'conexoes': {
                        'identificador': [
                            28,
                            29,
                            51,
                            53
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 53,
                    'posicionamento': {
                        'x': 230.1203,
                        'y': 0,
                        'z': 132.86
                    },
                    'conexoes': {
                        'identificador': [
                            29,
                            30,
                            52,
                            54
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 54,
                    'posicionamento': {
                        'x': 256.6658,
                        'y': 0,
                        'z': 68.7734
                    },
                    'conexoes': {
                        'identificador': [
                            30,
                            31,
                            53,
                            55
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 55,
                    'posicionamento': {
                        'x': 265.72,
                        'y': 0,
                        'z': 0
                    },
                    'conexoes': {
                        'identificador': [
                            31,
                            32,
                            54,
                            56
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 56,
                    'posicionamento': {
                        'x': 256.6658,
                        'y': 0,
                        'z': -68.7734
                    },
                    'conexoes': {
                        'identificador': [
                            32,
                            33,
                            55,
                            57
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 57,
                    'posicionamento': {
                        'x': 230.1203,
                        'y': 0,
                        'z': -132.86
                    },
                    'conexoes': {
                        'identificador': [
                            33,
                            34,
                            56,
                            58
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 58,
                    'posicionamento': {
                        'x': 187.8924,
                        'y': 0,
                        'z': -187.8924
                    },
                    'conexoes': {
                        'identificador': [
                            34,
                            35,
                            57,
                            59
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 59,
                    'posicionamento': {
                        'x': 132.86,
                        'y': 0,
                        'z': -230.1203
                    },
                    'conexoes': {
                        'identificador': [
                            35,
                            36,
                            58,
                            60
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 60,
                    'posicionamento': {
                        'x': 68.7734,
                        'y': 0,
                        'z': -256.6658
                    },
                    'conexoes': {
                        'identificador': [
                            36,
                            37,
                            59,
                            61
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 61,
                    'posicionamento': {
                        'x': 0,
                        'y': 0,
                        'z': -265.72
                    },
                    'conexoes': {
                        'identificador': [
                            37,
                            38,
                            60,
                            62
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 62,
                    'posicionamento': {
                        'x': -68.7734,
                        'y': 0,
                        'z': -256.6658
                    },
                    'conexoes': {
                        'identificador': [
                            38,
                            39,
                            61,
                            63
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 63,
                    'posicionamento': {
                        'x': -132.86,
                        'y': 0,
                        'z': -230.1203
                    },
                    'conexoes': {
                        'identificador': [
                            39,
                            40,
                            62,
                            64
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 64,
                    'posicionamento': {
                        'x': -187.8924,
                        'y': 0,
                        'z': -187.8924
                    },
                    'conexoes': {
                        'identificador': [
                            40,
                            41,
                            63,
                            65
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 65,
                    'posicionamento': {
                        'x': -230.1203,
                        'y': 0,
                        'z': -132.86
                    },
                    'conexoes': {
                        'identificador': [
                            41,
                            42,
                            64,
                            66
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 66,
                    'posicionamento': {
                        'x': -256.6658,
                        'y': 0,
                        'z': -68.7734
                    },
                    'conexoes': {
                        'identificador': [
                            42,
                            43,
                            65,
                            67
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 67,
                    'posicionamento': {
                        'x': -265.72,
                        'y': 0,
                        'z': 0
                    },
                    'conexoes': {
                        'identificador': [
                            43,
                            44,
                            66,
                            68
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 68,
                    'posicionamento': {
                        'x': -256.6658,
                        'y': 0,
                        'z': 68.7734
                    },
                    'conexoes': {
                        'identificador': [
                            44,
                            45,
                            67,
                            69
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 69,
                    'posicionamento': {
                        'x': -230.1203,
                        'y': 0,
                        'z': 132.86
                    },
                    'conexoes': {
                        'identificador': [
                            45,
                            46,
                            68,
                            70
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 70,
                    'posicionamento': {
                        'x': -187.8924,
                        'y': 0,
                        'z': 187.8924
                    },
                    'conexoes': {
                        'identificador': [
                            46,
                            47,
                            69,
                            71
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 71,
                    'posicionamento': {
                        'x': -132.86,
                        'y': 0,
                        'z': 230.1203
                    },
                    'conexoes': {
                        'identificador': [
                            47,
                            48,
                            70,
                            72
                        ]
                    },
                    'vetor': null,
                    'cor': null
                },
                {
                    'identificador': 72,
                    'posicionamento': {
                        'x': -68.7734,
                        'y': 0,
                        'z': 256.6658
                    },
                    'conexoes': {
                        'identificador': [
                            25,
                            48,
                            49,
                            71
                        ]
                    },
                    'vetor': null,
                    'cor': null
                }
            ]
            f = []
            u = []
            parametros.rigidez = { A: 1, E: 1 }
            for ( let i = 0; i <= 72; i++ ) {
                if ( i == 0 ) {
                    f.push( { identificador: i, x: 0, y: -100/(10**4), z: 0 } )
                } else {
                    f.push( { identificador: i, x: 0, y: 0, z: 0 } )
                }
                
                if ( i < 49 ) {
                    u.push( { identificador: i, u: 'indefinido', v: 'indefinido', w: 'indefinido' } )
                } else {
                    u.push( { identificador: i, u: 0, v: 0, w: 0 } )
                }
            }
        }
        if ( parametros.cfg == 4 ) {
            pontos = [ 
                { identificador: 0, posicionamento: { x: 0, y: 40, z: 0 }, conexoes: { identificador: [ 1, 2 ] }, vetor: null, cor: null },
                { identificador: 1, posicionamento: { x: 30, y: 40, z: 0 }, conexoes: { identificador: [0,2,3,4] }, vetor: null, cor: null },
                { identificador: 2, posicionamento: { x: 0, y: 0, z: 0 }, conexoes: { identificador: [0,1,3] }, vetor: null, cor: null },
                { identificador: 3, posicionamento: { x: 30, y: 0, z: 0 }, conexoes: { identificador: [2,1,4] }, vetor: null, cor: null },
                { identificador: 4, posicionamento: { x: 60, y: 0, z: 0 }, conexoes: { identificador: [1,3] }, vetor: null, cor: null }
            ]
            f = [
                { identificador: 0, x: 0, y: 0, z: 0 },
                { identificador: 1, x: 10000, y: 0, z: 0 },
                { identificador: 2, x: 0, y: 0, z: 0 },
                { identificador: 3, x: 0, y: -10000, z: 0 },
                { identificador: 4, x: 0, y: 0, z: 0 }
            ]
            u = [
                { identificador: 0, u: 0, v: 0, w: 0 },
                { identificador: 1, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 2, u: 0, v: 'indefinido', w: 'indefinido' },
                { identificador: 3, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 4, u: 0, v: 0, w: 0 }
            ]
            parametros.rigidez = { A: 1, E: 10**6 }
        }
        if ( parametros.cfg == 5 ) {
            pontos = [ 
                { identificador: 0, posicionamento: { x: 0, y: 0, z: 0 }, conexoes: { identificador: [ 1 ] }, vetor: null, cor: null },
                { identificador: 1, posicionamento: { x: 40, y: 0, z: 0 }, conexoes: { identificador: [0,2] }, vetor: null, cor: null },
                { identificador: 2, posicionamento: { x: 0, y: 30, z: 0 }, conexoes: { identificador: [1] }, vetor: null, cor: null }
            ]
            f = [
                { identificador: 0, x: 0, y: 0, z: 0 },
                { identificador: 1, x: 0, y: -10000, z: 0 },
                { identificador: 2, x: 0, y: 0, z: 0 }
            ]
            u = [
                { identificador: 0, u: 0, v: 0, w: 0 },
                { identificador: 1, u: 'indefinido', v: 'indefinido', w: 'indefinido' },
                { identificador: 2, u: 0, v: 0, w: 0 }
            ]  
            parametros.rigidez = { A: 200 * ( 10**(-4)), E: 200 * (10**6) }
        }
        console.log( pontos )
        rebubinarGrupos()
        posicionarMalha( pontos, estrutura, parametros )
        rebubinarMalha()   
        desenharPontos( estrutura, pontos, malha, .4 )
        desenharConexoes( estrutura, conexoes )
    } else {
        pontos = initPontos( malha )
        pontos = addConexoesPontos( malha, pontos, parametros )
        rebubinarGrupos()
        posicionarMalha( pontos, estrutura, parametros )
        rebubinarMalha()   
        desenharPontos( estrutura, pontos, malha, .2 )
        desenharConexoes( estrutura, conexoes )
        desenharGradiente( estrutura, malhaCelulas, malha, matrizes, 1  , parametros.visibilidade )
        desenharCelulas( celulas, esferas, estrutura, malha ) 
    }
    camera = initCamera( parametros ).camera
    cameraZ = initCamera( parametros ).cameraZ
    parametros.rodar.x = .004
    parametros.rodar.y = .004
    parametros.rodar.z = .004
}



function calcularMalha() {
    console.log( conexoes )
    matrizes = initMatrizes( pontos, conexoes, f, u, parametros.rigidez )
    pontos = adicionarVetoresNosPontos( pontos, matrizes )
    pontos = adicionarCoresNosPontos( pontos, matrizes )
    colorirMalha()
    rebubinarMalha()
    posicionarMalha( pontos, estrutura, parametros )
    desenharVetores( estrutura, pontos, malha )
    desenharPontos( estrutura, pontos, malha, .4 )
    desenharConexoes( estrutura, conexoes )

    if ( parametros.mode != 'manual' ) {
        desenharCelulas( celulas, esferas, estrutura, malha )
        desenharGradiente( estrutura, malhaCelulas, malha, matrizes, .01, parametros.visibilidade )
        refinamentoCelulas( esferas, celulas, parametros.refinamento, matrizes, malha )
    }

    parametros.rodar.x = .002
    parametros.rodar.y = 0
    parametros.rodar.z = 0
}

function desenharMalhaCalculada() {
    rebubinarMalha()
    colorirMalha()
    posicionarMalha( pontos, estrutura, parametros )
    desenharPontos( estrutura, pontos, malha, .1 )
    if ( parametros.mode != 'manual' ) {
        desenharGradiente( estrutura, malhaCelulas, malha, matrizes, .05, parametros.visibilidade )
    }
    parametros.rodar.x = .0025
    parametros.rodar.y = 0
    parametros.rodar.z = 0
}

function desenharFluxo() {
    desenharMalhaCalculada()
    rebubinarMalha()
    colorirMalha()
    posicionarMalha( pontos, estrutura, parametros )
    desenharPontos( estrutura, pontos, malha, .1 )
    if ( parametros.mode != 'manual' ) {
        desenharGradiente( estrutura, malhaCelulas, malha, matrizes, .01 , parametros.visibilidade )
        agentes = initAgentes( agentes, estrutura, parametros, malha, malhaCelulas, parametros.visibilidade )
    }
    parametros.rodar.x = .003
    parametros.rodar.y = 0
    parametros.rodar.z = 0

}

function desenharMalhaDeformada() {
    pontos = deformarPontos( pontos )
    conexoes = initConexoes( pontos )
    colorirMalha()
    posicionarMalha( pontos, estrutura, parametros )
    desenharVetores( estrutura, pontos, malha )
    desenharConexoes( estrutura, conexoes )
    desenharPontos( estrutura, pontos, malha, .4 )
    //refinamentoCelulas( esferas, celulas, parametros.refinamento, matrizes, malha )
}
function rebubinarMalha() {
    conexoes = initConexoes( pontos )
    if ( parametros.mode != 'manual' ) {
        celulas = initCelulas( malha )
        celulas = addConexoesCelulas( malha, pontos, celulas )
        celulas = mapearVerticesCelulas( celulas )
        malhaCelulas = refinamentoCelulas( esferas, celulas, parametros.refinamento, matrizes, malha )
    }
    
}
function rebubinarGrupos() {
    group = new THREE.Group
    cena.add(group)
    estrutura = new THREE.Group
    group.add(estrutura)
    esferas = new THREE.Group()
    estrutura.add( esferas )
}
function colorirMalha() {
    cena = initCena()
    initIluminar( cena )
    rebubinarGrupos()
}

function cfgRefinamentoGradiente() {
    parametros.refinamento.x = parametros.dimensoes.x <= 3 ? 10 : (parametros.dimensoes.x * 2 + 3 )
    parametros.refinamento.y = parametros.dimensoes.y <= 3 ? 10 : (parametros.dimensoes.y * 2 + 3 )
    parametros.refinamento.z = parametros.dimensoes.z <= 3 ? 10 : (parametros.dimensoes.z * 2 + 3 )
}
function cfgRefinamentoFluxo() {
    parametros.refinamento.x = 4
    parametros.refinamento.y = 4
    parametros.refinamento.z = 4
}


// Configurações do ambiente 3d
function initEnv() {
    console.log( '2 - instanciando Ambiente' )
    canvas = initCanvas()
    camera = initCamera( parametros ).camera
    cameraZ = initCamera( parametros ).cameraZ
    cena = initCena()
    initIluminar( cena )
    renderer = initRenderer( canvas )
}
function render() {
    renderer.render( cena, camera )
    //console.log( '10 - atualizando o Renderizador' )
}
function resize() {
    renderer.setSize( window.innerWidth, window.innerHeight )
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    console.log( '7 - ajustando Tela' )
}

// carregar interface
function initInterface( body, parametros ) {   
    navLinks = initNav( body, parametros )   
    initSliders( body, parametros )
    initGradienteInputs( body, parametros, navLinks )
    next = initNext( body, matrizes, navLinks, parametros.rodar )
    before = initBefore( body, navLinks, parametros.rodar )
}

function initNext( body ) {
    let next = criarElemento( 'div', { class: 'next' } )
    next.append( '❯' )
    next.addEventListener( 'click', event => executarNext() ) 
    body.append( next )
    return next
}
function executarNext() {
    if ( matrizes == null ) {
        calcularMalha()
        navegarPontos( navLinks[1].a, navLinks )
    } else if ( parametros.rodar.x == .002 ) {
        cfgRefinamentoGradiente()
        desenharMalhaCalculada()
        navegarPontos( navLinks[2].a, navLinks )
    } else if ( parametros.rodar.x == .0025  ) {
        cfgRefinamentoFluxo()
        desenharFluxo()
        navegarPontos( navLinks[3].a, navLinks )
    } else if ( parametros.rodar.x == .003  ) {
        desenharMalhaDeformada()
        navegarPontos( navLinks[4].a, navLinks )
    }  
}
export { 
    ajustarMalha, 
    cfgRefinamentoGradiente, 
    cfgRefinamentoFluxo, 
    calcularMalha, 
    desenharMalhaCalculada, 
    desenharFluxo, 
    desenharMalhaDeformada 
}

