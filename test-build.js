// Test script to validate the build
const fs = require('fs');
const path = require('path');

console.log('=== Testing Spine Particle Studio Build ===\n');

// Check if main files exist
const requiredFiles = [
    'main.js',
    'index.html',
    'styles.css',
    'package.json',
    'tsconfig.json',
    'dist/renderer.js',
    'dist/index.js',
];

let allFilesExist = true;
for (const file of requiredFiles) {
    const exists = fs.existsSync(path.join(__dirname, file));
    console.log(`[${exists ? '✓' : '✗'}] ${file}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking Core Modules ===\n');

const coreModules = [
    'dist/core/Particle.js',
    'dist/core/ParticlePool.js',
    'dist/core/ParticleEmitter.js',
    'dist/core/ParticleManager.js',
];

for (const module of coreModules) {
    const exists = fs.existsSync(path.join(__dirname, module));
    console.log(`[${exists ? '✓' : '✗'}] ${module}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking Renderer Modules ===\n');

const rendererModules = [
    'dist/renderer/CanvasRenderer.js',
    'dist/renderer/GridRenderer.js',
];

for (const module of rendererModules) {
    const exists = fs.existsSync(path.join(__dirname, module));
    console.log(`[${exists ? '✓' : '✗'}] ${module}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking Export Modules ===\n');

const exportModules = [
    'dist/export/SpineExporter.js',
    'dist/export/AnimationBaker.js',
];

for (const module of exportModules) {
    const exists = fs.existsSync(path.join(__dirname, module));
    console.log(`[${exists ? '✓' : '✗'}] ${module}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking UI Modules ===\n');

const uiModules = [
    'dist/ui/UIController.js',
    'dist/ui/TreePanel.js',
    'dist/ui/SettingsPanel.js',
    'dist/ui/ControlBar.js',
];

for (const module of uiModules) {
    const exists = fs.existsSync(path.join(__dirname, module));
    console.log(`[${exists ? '✓' : '✗'}] ${module}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking Utilities ===\n');

const utilModules = [
    'dist/utils/Vector2D.js',
    'dist/utils/MathUtils.js',
    'dist/utils/ColorUtils.js',
];

for (const module of utilModules) {
    const exists = fs.existsSync(path.join(__dirname, module));
    console.log(`[${exists ? '✓' : '✗'}] ${module}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking Presets ===\n');

const presetModules = [
    'dist/presets/ParticlePresets.js',
];

for (const module of presetModules) {
    const exists = fs.existsSync(path.join(__dirname, module));
    console.log(`[${exists ? '✓' : '✗'}] ${module}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking Physics Modules ===\n');

const physicsModules = [
    'dist/physics/PhysicsWorld.js',
    'dist/physics/Obstacle.js',
    'dist/physics/CollisionHandler.js',
];

for (const module of physicsModules) {
    const exists = fs.existsSync(path.join(__dirname, module));
    console.log(`[${exists ? '✓' : '✗'}] ${module}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Checking Documentation ===\n');

const docs = ['docs/README.md'];
for (const doc of docs) {
    const exists = fs.existsSync(path.join(__dirname, doc));
    console.log(`[${exists ? '✓' : '✗'}] ${doc}`);
    if (!exists) allFilesExist = false;
}

console.log('\n=== Summary ===\n');

if (allFilesExist) {
    console.log('✓ All required files are present');
    console.log('✓ Build successful');
    console.log('\nTo run the application:');
    console.log('  npm start');
    process.exit(0);
} else {
    console.log('✗ Some files are missing');
    console.log('✗ Build may be incomplete');
    process.exit(1);
}
