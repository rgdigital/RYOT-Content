# RYOT Content Bootstrap

## Setting up environment

These steps will install command line tools needed to isntall & run the project.

- Install [Node](https://nodejs.org/en/download/). This is used to install the project.
- Now open terminal. <kbd>command</kbd> + <kbd>space</kbd> to open mac search bar.
- Type **terminal** and press enter.
- Now you need to downgrade node to version 4 (Sass compiling doesn't work with recent versions of Node).

⋅⋅⋅ Run these 3 commands (separately, one-by-one) to downgrade node:
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

- Now you need to install gulp command line tools to run the project. In terminal, run this -
```
npm install --global gulp-cli
```

Now you have all the tools needed to run a project from terminal.

## Installing
- Install Cisco AnyConnect. You need to connect to a VPN to access RYOT git repositories.
- Download the [RYOT Content zip](https://git.ouroath.com/ryot-uk/RYOT-Content/archive/master.zip)
- Unzip it.
- In terminal, go the folder you unzipped the package to using the `cd` function. Eg, `cd /path/to/folder`. You can drag a file to terminal to enter the path automatically.
- Install the package with `sudo npm install`.
- Run the content bootstrap with `gulp`.
- A browser window should now pop up with the project.

## Developing
- To add HTML, edit the **index.html** page from `src/index.html` (parent.html is used to preview the page locally). This page has examples of how to use the framework.
- To add CSS, edit the **style.scss** file in `public/style.scss`. These are sass files, but you can use normal CSS here too.
- To add Javascript, edit the **run.js** file in `src/app/run.js`.

## Parallax hover box 
```html
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

## ryot-inview
```html
  <div class="full-width row">
    <div class="col ryot-inview anim-fromleft">
      <img src="https://placeimg.com/400/200/any" class="img-fluid">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div class="col ryot-inview anim-fromright">
      <img src="https://placeimg.com/400/200/any" class="img-fluid">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
  </div>
```

### API
- `data-ryot-scale="1.1"` How much layer items scale by on hover.
- `data-ryot-snapspeed="0.4"` The speed at which the layers snap back in place on mouseout.