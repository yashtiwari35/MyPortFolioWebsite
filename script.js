/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
if (cursor && cursorDot) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a,button,.proj-card,.service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const dest = document.querySelector(href);
    if (dest) { e.preventDefault(); dest.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

/* ── SKILL BARS ── */
const skillBars = document.querySelectorAll('.skill-bar');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.pct + '%';
    }
  });
}, { threshold: 0.4 });
skillBars.forEach(bar => skillObs.observe(bar));

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const msgEl = document.getElementById('formMsg');
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();

      if (data.success) {
        msgEl.style.display = 'block';
        msgEl.style.background = 'rgba(34,197,94,0.12)';
        msgEl.style.border = '1px solid rgba(34,197,94,0.3)';
        msgEl.style.color = '#22c55e';
        msgEl.textContent = '✅ Message sent! I will get back to you soon.';
        form.reset();
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch(err) {
      msgEl.style.display = 'block';
      msgEl.style.background = 'rgba(230,57,70,0.12)';
      msgEl.style.border = '1px solid rgba(230,57,70,0.3)';
      msgEl.style.color = '#ff8080';
      msgEl.textContent = '❌ ' + (err.message || 'Something went wrong. Try again.');
    }

    btn.textContent = 'Send Message →';
    btn.disabled = false;
    setTimeout(() => { msgEl.style.display = 'none'; }, 5000);
  });
}

/* ── THREE.JS 3D BACKGROUND ── */
(function() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 20;

  /* ── Floating particles ── */
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const matPts = new THREE.PointsMaterial({
    color: 0xe63946,
    size: 0.08,
    transparent: true,
    opacity: 0.6,
  });
  const points = new THREE.Points(geo, matPts);
  scene.add(points);

  /* ── Wireframe torus ── */
  const torusGeo = new THREE.TorusGeometry(6, 1.8, 16, 60);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0xe63946,
    wireframe: true,
    transparent: true,
    opacity: 0.06,
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(10, -2, -8);
  scene.add(torus);

  /* ── Wireframe sphere ── */
  const sphereGeo = new THREE.SphereGeometry(4, 18, 18);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0xe63946,
    wireframe: true,
    transparent: true,
    opacity: 0.05,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.set(-12, 4, -6);
  scene.add(sphere);

  /* ── Small floating cubes ── */
  const cubes = [];
  for (let i = 0; i < 12; i++) {
    const size = 0.15 + Math.random() * 0.35;
    const cGeo = new THREE.BoxGeometry(size, size, size);
    const cMat = new THREE.MeshBasicMaterial({
      color: 0xe63946,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const cube = new THREE.Mesh(cGeo, cMat);
    cube.position.set(
      (Math.random() - 0.5) * 36,
      (Math.random() - 0.5) * 24,
      (Math.random() - 0.5) * 10 - 5
    );
    cube.userData = {
      rx: (Math.random() - 0.5) * 0.012,
      ry: (Math.random() - 0.5) * 0.012,
      vy: (Math.random() - 0.5) * 0.008,
    };
    scene.add(cube);
    cubes.push(cube);
  }

  /* ── Grid lines ── */
  const gridHelper = new THREE.GridHelper(60, 30, 0xe63946, 0xe63946);
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.04;
  gridHelper.position.y = -12;
  scene.add(gridHelper);

  /* ── Ambient light ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  /* ── Mouse interaction ── */
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ── Scroll parallax ── */
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  /* ── Resize ── */
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  /* ── Animation Loop ── */
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Rotate big shapes
    torus.rotation.x = t * 0.08;
    torus.rotation.y = t * 0.05;
    sphere.rotation.y = t * 0.06;
    sphere.rotation.x = t * 0.04;

    // Points drift
    points.rotation.y = t * 0.015;
    points.rotation.x = mouseY * 0.03;

    // Camera subtle follow mouse
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.04;

    // Scroll parallax
    camera.position.z = 20 - scrollY * 0.01;

    // Cubes float
    cubes.forEach(c => {
      c.rotation.x += c.userData.rx;
      c.rotation.y += c.userData.ry;
      c.position.y += c.userData.vy;
      if (c.position.y > 14) c.position.y = -14;
      if (c.position.y < -14) c.position.y = 14;
    });

    renderer.render(scene, camera);
  }
  animate();
})();
