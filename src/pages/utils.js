
export function disableCtrlKey() {
    document.addEventListener("keydown", function(event) {
      if (event.ctrlKey) {
        event.preventDefault();
        console.log("Ctrl key is disabled on this site");
      }
    });
  }
  