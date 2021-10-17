document.getElementById("choose-file").onchange = function () {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("uploaded-img").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
    document.getElementById("show-btn").addEventListener("mouseover", showButtons);
};
document.getElementById("show-btn").addEventListener("mouseout", function() {
  document.getElementById("edit-button").style.opacity="0";
  document.getElementById("delete-button").style.opacity="0";
});
function showButtons() {
  document.getElementById("edit-button").style.opacity="0.8";
  document.getElementById("delete-button").style.opacity="0.8";
}
