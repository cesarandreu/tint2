module.exports = (function() {
  $ = process.bridge.dotnet;
  $.import('System.Windows.Forms.dll');

  $utilities = require('Utilities');

  function Screens() {
    var scaleFactor = $.System.Windows.SystemParameters.Dpi/96;

    function getScreenInfo(Screen) {
      var frame = Screen.Bounds;
      var visibleFrame = Screen.WorkingArea;
      var obj = {
        bitsPerPixel:Screen.BitsPerPixel,
        scaleFactor:scaleFactor, 
        OSSpecificInformation:Screen.DeviceName,
        bounds:{
          x:Math.round(frame.X/scaleFactor),
          y:Math.round(frame.Y/scaleFactor),
          width:Math.round(frame.Width/scaleFactor -5),
          height:Math.round(frame.Height/scaleFactor -5)
        },
        visibleBounds:{
          x:Math.round(visibleFrame.X/scaleFactor),
          y:Math.round(visibleFrame.Y/scaleFactor),
          width:Math.round(visibleFrame.Width/scaleFactor -5),
          height:Math.round(visibleFrame.Height/scaleFactor -5)
        }
      };
      return obj;
    }

    Object.defineProperty(this, 'active', { get:function() { return getScreenInfo( $.System.Windows.Forms.Screen.PrimaryScreen ); } });

    Object.defineProperty(this, 'all', { 
      get:function() {
        var screens = $.System.Windows.Forms.Screen.AllScreens;
        var count = screens.Length;
        var values = [];
        for(var i=0; i < count; i++) {
          var scrn = getScreenInfo(screens.GetValue(i));
          scrn.isPrimary = scrn.Primary ? true : false;
          values.push(scrn);
        }
        return values;
      }
    });
  }

  return new Screens();

})();