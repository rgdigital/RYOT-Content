# RYOT Content Bootstrap

## Parallax hover box 
```javascript
  <!-- Parallax component with 4 layers -->
  <div class="ryot-hover-parallax" data-ryot-scale="1.1" data-ryot-snapspeed="0.4" style="background:#000000;margin-top:20px;">
    <div class="ryot-layer ryot-hover-parallax-layer-1"><img src="public/img/im_ryot_logo_01.png" alt=""></div>
    <div class="ryot-layer ryot-hover-parallax-layer-2"><img src="public/img/im_ryot_logo_02.png" alt=""></div>
    <div class="ryot-layer ryot-hover-parallax-layer-3"><img src="public/img/im_ryot_logo_03.png" alt=""></div>
    <div class="ryot-layer ryot-hover-parallax-layer-4"><img src="public/img/im_ryot_logo_04.png" alt=""></div>
  </div>
```

### API
- `data-ryot-scale="1.1"` How much layer items scale by on hover.
- `data-ryot-snapspeed="0.4"` The speed at which the layers snap back in place on mouseout.