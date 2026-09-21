import * as THREE from 'three'

/**
 * Gatita estilo Adopt Me: cabeza enorme, cuerpo rechoncho, patas cortas.
 * Los colores salen del gato de la foto — atigrado gris plata, ojos verdes.
 */

const COAT = 0xd2cabe
const COAT_DARK = 0x9b9184
const CREAM = 0xf7f2e8
const STRIPE = 0x8d8376
const PINK = 0xe6b3b6
const NOSE = 0xcf9096
const BLUSH = 0xf3a8b0
const EYE = 0x2b241c
const IRIS = 0x8fbb86

function matte(color: number, extra: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.88, metalness: 0, ...extra })
}

function shadowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(90,64,33,0.42)')
  g.addColorStop(0.55, 'rgba(90,64,33,0.16)')
  g.addColorStop(1, 'rgba(90,64,33,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export const VIEW = {
  fov: 30,
  pos: [0, 0.75, 7.2] as const,
  look: [0, 0.34, 0] as const,
}

export function addLights(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xfff6e2, 0xe4dbcc, 1.35))
  const key = new THREE.DirectionalLight(0xfff4de, 1.55)
  key.position.set(2.6, 4.2, 3.4)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xe8f0ff, 0.5)
  fill.position.set(-3.2, 1.2, 2.2)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(0xffe4f0, 0.55)
  rim.position.set(-2.4, 1.6, -3)
  scene.add(rim)
}

export type Pet = {
  root: THREE.Group
  head: THREE.Group
  tail: THREE.Group
  ears: THREE.Group[]
  eyes: THREE.Group[]
  dispose: () => void
}

export function buildPet(): Pet {
  const made: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> = []
  const keep = <T extends THREE.BufferGeometry | THREE.Material | THREE.Texture>(x: T) => {
    made.push(x)
    return x
  }

  const coat = keep(matte(COAT))
  const coatDark = keep(matte(COAT_DARK))
  const cream = keep(matte(CREAM))
  const stripe = keep(matte(STRIPE))
  const pink = keep(matte(PINK))
  const nose = keep(matte(NOSE))
  const eyeMat = keep(matte(EYE, { roughness: 0.32 }))
  const irisMat = keep(matte(IRIS, { roughness: 0.4 }))
  const shineMat = keep(new THREE.MeshBasicMaterial({ color: 0xffffff }))
  const blushMat = keep(matte(BLUSH, { transparent: true, opacity: 0.55 }))

  const sphere = keep(new THREE.SphereGeometry(1, 40, 28))
  const root = new THREE.Group()

  /* ---- sombra de contacto ---- */
  const shadowTex = keep(shadowTexture())
  const shadowMat = keep(
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  )
  const shadowGeo = keep(new THREE.PlaneGeometry(2.9, 2.9))
  const shadow = new THREE.Mesh(shadowGeo, shadowMat)
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -0.72
  root.add(shadow)

  /* ---- cuerpo ---- */
  const body = new THREE.Mesh(sphere, coat)
  body.scale.set(0.73, 0.61, 0.7)
  body.position.set(0, -0.06, -0.05)
  root.add(body)

  const chest = new THREE.Mesh(sphere, cream)
  chest.scale.set(0.38, 0.34, 0.3)
  chest.position.set(0, -0.18, 0.45)
  root.add(chest)

  /* Bandas que envuelven el lomo y bajan por el flanco: el atigrado real.
     El radio sigue la elipsoide del cuerpo en cada corte. */
  const BODY = { rx: 0.73, ry: 0.61, rz: 0.7, y: -0.06, z: -0.05 }
  for (const [dz, op] of [
    [-0.27, 0.9],
    [-0.02, 1],
    [0.23, 0.86],
  ] as const) {
    const k = Math.sqrt(Math.max(0, 1 - (dz / BODY.rz) ** 2))
    const band = keep(new THREE.TorusGeometry(BODY.rx * k * 1.008, 0.034, 8, 64, Math.PI * 0.94))
    const m = new THREE.Mesh(band, stripe)
    m.position.set(0, BODY.y, BODY.z + dz)
    m.rotation.z = Math.PI * 0.03
    m.scale.set(1, (BODY.ry / BODY.rx) * op, 1)
    root.add(m)
  }

  /* ---- patas ---- */
  const legGeo = keep(new THREE.CapsuleGeometry(0.175, 0.16, 6, 18))
  const pawGeo = keep(new THREE.SphereGeometry(0.185, 22, 16))
  for (const [x, z, front] of [
    [0.3, 0.32, 1],
    [-0.3, 0.32, 1],
    [0.38, -0.26, 0],
    [-0.38, -0.26, 0],
  ] as const) {
    const leg = new THREE.Mesh(legGeo, front ? coat : coatDark)
    leg.position.set(x, -0.46, z)
    root.add(leg)
    const paw = new THREE.Mesh(pawGeo, cream)
    paw.position.set(x, -0.63, z + 0.03)
    paw.scale.set(1, 0.8, 1.1)
    root.add(paw)
  }

  /* ---- cola ---- */
  const tail = new THREE.Group()
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, -0.24, -0.5),
    new THREE.Vector3(0.46, -0.04, -0.7),
    new THREE.Vector3(0.68, 0.42, -0.52),
    new THREE.Vector3(0.56, 0.82, -0.2),
  ])
  const tailGeo = keep(new THREE.TubeGeometry(curve, 30, 0.108, 14, false))
  tail.add(new THREE.Mesh(tailGeo, coat))
  const tipGeo = keep(new THREE.SphereGeometry(0.105, 20, 14))
  const tip = new THREE.Mesh(tipGeo, coatDark)
  tip.position.copy(curve.getPoint(1))
  tail.add(tip)
  root.add(tail)

  /* ---- cabeza ---- */
  const head = new THREE.Group()
  head.position.set(0, 0.84, 0.05)

  const skull = new THREE.Mesh(sphere, coat)
  skull.scale.set(1.02, 0.95, 0.93)
  head.add(skull)

  const ears: THREE.Group[] = []
  const earGeo = keep(new THREE.ConeGeometry(0.36, 0.66, 22))
  const earInnerGeo = keep(new THREE.ConeGeometry(0.22, 0.44, 20))
  for (const side of [-1, 1]) {
    const ear = new THREE.Group()
    ear.position.set(0.62 * side, 0.76, -0.02)
    ear.rotation.z = -0.34 * side
    ear.rotation.x = -0.1
    const outer = new THREE.Mesh(earGeo, coat)
    ear.add(outer)
    const innerEar = new THREE.Mesh(earInnerGeo, pink)
    innerEar.position.set(0, -0.02, 0.1)
    ear.add(innerEar)
    head.add(ear)
    ears.push(ear)
  }

  const foreGeo = keep(new THREE.BoxGeometry(0.075, 0.26, 0.06))
  for (const [x, rz] of [
    [-0.24, 0.3],
    [0, 0],
    [0.24, -0.3],
  ] as const) {
    const m = new THREE.Mesh(foreGeo, stripe)
    m.position.set(x, 0.56, 0.74)
    m.rotation.set(0.5, 0, rz)
    head.add(m)
  }

  const eyes: THREE.Group[] = []
  const eyeGeo = keep(new THREE.SphereGeometry(0.235, 28, 20))
  const irisGeo = keep(new THREE.TorusGeometry(0.155, 0.042, 10, 28))
  const shineGeo = keep(new THREE.SphereGeometry(0.072, 16, 12))
  const shine2Geo = keep(new THREE.SphereGeometry(0.038, 14, 10))
  for (const side of [-1, 1]) {
    const eye = new THREE.Group()
    eye.position.set(0.38 * side, 0.08, 0.78)
    const ball = new THREE.Mesh(eyeGeo, eyeMat)
    ball.scale.set(1, 1.16, 0.62)
    eye.add(ball)
    const iris = new THREE.Mesh(irisGeo, irisMat)
    iris.position.z = 0.1
    iris.scale.set(1, 1.1, 1)
    eye.add(iris)
    const shine = new THREE.Mesh(shineGeo, shineMat)
    shine.position.set(-0.075 * side, 0.1, 0.16)
    eye.add(shine)
    const shine2 = new THREE.Mesh(shine2Geo, shineMat)
    shine2.position.set(0.085 * side, -0.09, 0.15)
    eye.add(shine2)
    head.add(eye)
    eyes.push(eye)
  }

  for (const side of [-1, 1]) {
    const blush = new THREE.Mesh(sphere, blushMat)
    blush.scale.set(0.19, 0.12, 0.05)
    blush.position.set(0.63 * side, -0.16, 0.62)
    head.add(blush)
  }

  for (const side of [-1, 1]) {
    const cheek = new THREE.Mesh(sphere, cream)
    cheek.scale.set(0.165, 0.135, 0.125)
    cheek.position.set(0.15 * side, -0.3, 0.85)
    head.add(cheek)
  }

  const noseGeo = keep(new THREE.SphereGeometry(0.072, 18, 14))
  const snout = new THREE.Mesh(noseGeo, nose)
  snout.scale.set(1.2, 0.85, 0.75)
  snout.position.set(0, -0.19, 0.95)
  head.add(snout)

  const smileCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, -0.3, 0.87),
    new THREE.Vector3(-0.07, -0.37, 0.91),
    new THREE.Vector3(0, -0.31, 0.93),
    new THREE.Vector3(0.07, -0.37, 0.91),
    new THREE.Vector3(0.15, -0.3, 0.87),
  ])
  const smileGeo = keep(new THREE.TubeGeometry(smileCurve, 22, 0.017, 8, false))
  head.add(new THREE.Mesh(smileGeo, keep(matte(0x8a7264))))

  root.add(head)
  root.position.y = 0.16

  return {
    root,
    head,
    tail,
    ears,
    eyes,
    dispose: () => made.forEach((x) => x.dispose()),
  }
}
