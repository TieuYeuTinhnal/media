# UI Design Specification

## Application Layout

The Spine Particle Studio uses a three-panel dark-themed layout:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Spine Particle Studio                                 │
├──────────────┬────────────────────────────────────┬──────────────────────────┤
│              │                                    │                          │
│   TREE       │           CANVAS                   │       SETTINGS           │
│   (250px)    │           (flex)                   │        (320px)           │
│              │                                    │                          │
│ ┌──────────┐│                                    │┌────────────────────────┐│
│ │   Tree   ││                                    ││ Init Update Physics... ││
│ └──────────┘│                                    │└────────────────────────┘│
│              │       [Grid Background]            │                          │
│ Emitter 1    │                                    │ ┌────────────────────┐  │
│ Emitter 2    │         ●  ● ●                     │ │ Timing             │  │
│ Default ✓    │        ● ●   ● ●                   │ │ ├─ Delay: 0       │  │
│              │         ● ● ● ●                    │ │ ├─ Duration: 2000 │  │
│              │        ●  ●   ●                    │ │ └─ Time Scale: 1  │  │
│              │                                    │ └────────────────────┘  │
│              │                                    │                          │
│              │         (Particles)                │ ┌────────────────────┐  │
│              │                                    │ │ Emission           │  │
│              │                                    │ │ ├─ Radius: 10     │  │
│              │                                    │ │ ├─ Count: 100     │  │
│              │                                    │ │ └─ Rate: 50 p/s   │  │
│              │                                    │ └────────────────────┘  │
│              │                                    │                          │
│              │                                    │ ┌────────────────────┐  │
│              │                                    │ │ Life               │  │
│              │                                    │ │ ├─ Min: 1.0 s     │  │
│              │                                    │ │ └─ Max: 2.0 s     │  │
│              │                                    │ └────────────────────┘  │
│              │                                    │                          │
│ ┌──────────┐│                                    │  (More settings...)     │
│ │   New    ││                                    │                          │
│ └──────────┘│                                    │                          │
├──────────────┴────────────────────────────────────┴──────────────────────────┤
│ Particles: 234  ☑ Loop    [Simulate] [Record]                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Dark Theme Palette
- **Background Primary**: `#1e1e1e` - Main canvas background
- **Background Secondary**: `#2e2e2e` - Panel backgrounds
- **Background Tertiary**: `#252525` - Headers and darker sections
- **Border**: `#3e3e3e` - Panel dividers and borders
- **Hover**: `#3a3a3a` - Interactive element hover
- **Selection**: `#3a5a6a` - Selected items (blue-teal)
- **Text Primary**: `#d4d4d4` - Main text
- **Text Secondary**: `#cccccc` - Labels
- **Accent**: `#4ec9b0` - Highlights and active states

### Button Colors
- **Primary**: `#0e639c` → `#1177bb` (hover) - Important actions
- **Success**: `#16825d` → `#1a9e6f` (hover) - Simulate button
- **Danger**: `#c5292a` → `#d93234` (hover) - Record button
- **Secondary**: `#3e3e3e` → `#4a4a4a` (hover) - Other actions

## Left Panel - Tree View

**Header**: "Tree" in uppercase
**Content**: Scrollable list of emitters
**Footer**: "New" button

### Tree Item States
- **Normal**: Gray text, transparent background
- **Hover**: Slightly lighter background (`#3a3a3a`)
- **Selected**: Blue-teal background (`#3a5a6a`), white text

### Example
```
┌──────────────┐
│    TREE      │
├──────────────┤
│              │
│ Emitter 1    │
│ Fire Effect  │
│ Default  ✓   │  ← Selected (blue-teal)
│ Smoke Trail  │
│              │
├──────────────┤
│ [   New    ] │
└──────────────┘
```

## Center Panel - Canvas

**Main Area**: Full-size canvas with grid
**Grid**: 50px squares in `#2a2a2a`
**Center Crosshair**: Brighter grid lines (`#4a4a4a`)
**Particle Origin**: Center of canvas (0, 0 coordinates)

### Control Bar (Bottom)
- **Particle Count**: "Particles: 234" with count in cyan (`#4ec9b0`)
- **Loop Checkbox**: Standard checkbox with label
- **Simulate Button**: Green (`#16825d`)
- **Record Button**: Red (`#c5292a`)

### Canvas Features
- Automatically resizes with window
- Grid background for reference
- Particles render from center outward
- Real-time updates at 60 FPS

## Right Panel - Settings

**Tabs**: Four tabs switching between settings pages
- Init (default)
- Update
- Physics  
- Settings

### Tab Design
```
┌────────────────────────────────────┐
│ Init  Update  Physics  Settings    │  ← Tabs
├────────────────────────────────────┤
│ [Content Area - Scrollable]        │
│                                    │
│ Timing                             │
│ ├─ Delay (ms): [    0    ]        │
│ ├─ Duration (ms): [ 2000  ]       │
│ └─ Time Scale: [   1.0   ]        │
│                                    │
│ Emission                           │
│ ├─ Radius: [   10   ]             │
│ ├─ Count: [  100   ]              │
│ └─ Rate (p/s): [   50   ]         │
│                                    │
```

### Input Styles
- **Number Inputs**: Dark background (`#1e1e1e`), light text
- **Color Pickers**: Full width, 32px height
- **Dropdowns**: Same styling as number inputs
- **Checkboxes**: Inline with labels
- **Buttons**: Full width, primary or secondary style

## Settings Tab Content

### Init Tab
Organized into collapsible groups:
1. **Timing** - Delay, Duration, Time Scale
2. **Emission** - Radius, Count, Rate, Variety
3. **Life** - Min, Max
4. **Speed** - Min, Max, Angle, Spread
5. **Scale** - Min, Max
6. **Rotation** - Min, Max, Speed
7. **Mass** - Min, Max
8. **Appearance** - Color, Shape, Texture

### Update Tab
1. **Forces** - Gravity X/Y, Wind X/Y, Drag
2. **Scale Over Time** - Start, End
3. **Alpha Over Time** - Start, End
4. **Color Over Time** - Start Color, End Color

### Physics Tab
1. **Collision** - Radius, Bounce, Friction, Kill on Collision
2. **Layer** - Collision Layer dropdown
3. **Boundaries** - Enable Bounds, Kill Offscreen

### Settings Tab
1. **Project** - Save/Load buttons
2. **Export** - FPS input, Export button
3. **Performance** - Max Particles, Object Pooling checkbox
4. **Presets** - Dropdown with 10 presets, Load button

## Responsive Behavior

### Minimum Window Size
- Width: 1200px
- Height: 700px

### Panel Sizing
- Left Panel: Fixed 250px
- Right Panel: Fixed 320px
- Center Panel: Flexible (takes remaining space)

### Scrolling
- Tree Panel: Vertical scroll when content exceeds height
- Settings Tabs: Vertical scroll for long forms
- Canvas: No scroll (auto-resizes)

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Font Sizes
- **Headers**: 14px, uppercase, bold
- **Labels**: 12px
- **Inputs**: 13px
- **Buttons**: 13px, medium weight
- **Tree Items**: 13px

## Interactive States

### Buttons
- **Normal**: Solid background
- **Hover**: Slightly lighter background
- **Active**: Darker background
- **Recording**: Pulsing glow effect

### Inputs
- **Normal**: Dark background, light border
- **Focus**: Cyan border (`#4ec9b0`)
- **Disabled**: 50% opacity

### Tree Items
- **Normal**: No background
- **Hover**: Light gray background
- **Selected**: Blue-teal background

## Special Effects

### Recording Indicator
When recording is active:
```css
box-shadow: 0 0 10px rgba(197, 41, 42, 0.5);
```

### Particle Rendering
- Particles use alpha blending
- Color interpolation over lifetime
- Scale and rotation transforms
- Additive or normal blend modes

## Accessibility

- High contrast text on dark background
- Adequate padding for click targets
- Keyboard shortcuts supported
- Visual feedback for all interactions
- Clear focus indicators

## Performance Considerations

- Virtual scrolling for large particle counts
- Efficient canvas rendering
- Throttled input updates
- Object pooling visualization
- FPS counter (optional)

---

This design creates a professional, game-development-tool aesthetic similar to Unity, Unreal Engine, or other industry-standard particle editors.
