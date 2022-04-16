text_button = document.getElementById("text_button");
link_button = document.getElementById("link_button");
wifi_button = document.getElementById("wifi_button");

text_button.addEventListener('click', text_button_click);
link_button.addEventListener('click', link_button_click);
wifi_button.addEventListener('click', wifi_button_click);

text_input_container = document.getElementById("text_input_container");
link_input_container = document.getElementById("link_input_container");
wifi_input_container = document.getElementById("wifi_input_container");
result_container = document.getElementById("result_container");

generateQR_text = document.getElementById("generate_qr_text");
generateQR_link = document.getElementById("generate_qr_link");
generateQR_wifi = document.getElementById("generate_qr_wifi");

generateQR_text.addEventListener('click', text_generate_click);
generateQR_link.addEventListener('click', link_generate_click);
generateQR_wifi.addEventListener('click', wifi_generate_click);

toggle_password = document.getElementById("toggle_password");
toggle_password.addEventListener('click', toggle_password_click);

download_button = document.getElementById("download");
download_button.addEventListener('click', download_button_click);

function text_button_click() {
    text_input_container.classList.remove("disabled");
    link_input_container.classList.add("disabled");
    wifi_input_container.classList.add("disabled");
    result_container.classList.add("disabled");
}

function link_button_click() {
    text_input_container.classList.add("disabled");
    link_input_container.classList.remove("disabled");
    wifi_input_container.classList.add("disabled");
    result_container.classList.add("disabled");
}

function wifi_button_click() {
    text_input_container.classList.add("disabled");
    link_input_container.classList.add("disabled");
    wifi_input_container.classList.remove("disabled");
    result_container.classList.add("disabled");
}

function text_generate_click() {
    qrcode_box = document.getElementById("qrcode");
    while (qrcode_box.hasChildNodes()) {
        qrcode_box.removeChild(qrcode_box.firstChild);
    }

    qr = document.createElement("img");
    content = document.getElementById("qr_content_text").value

    if (content == ""){
        alert("텍스트를 입력해주세요.");
        return;
    }

    qr.src = get_qrcode(content);
    qr.id = "qr_image";

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        qr.style.width = "500px";
    }

    qrcode_box.appendChild(qr)

    result_container.classList.remove("disabled");
}

function link_generate_click() {
    qrcode_box = document.getElementById("qrcode");
    while (qrcode_box.hasChildNodes()) {
        qrcode_box.removeChild(qrcode_box.firstChild);
    }

    qr = document.createElement("img");
    content = document.getElementById("qr_content_link").value

    if (content == ""){
        alert("링크를 입력해주세요.");
        return;
    }

    qr.src = get_qrcode(content);
    qr.id = "qr_image";

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        qr.style.width = "500px";
    }

    qrcode_box.appendChild(qr)

    result_container.classList.remove("disabled");
}

function wifi_generate_click() {
    qrcode_box = document.getElementById("qrcode");
    while (qrcode_box.hasChildNodes()) {
        qrcode_box.removeChild(qrcode_box.firstChild);
    }

    qr = document.createElement("img");
    wifi_name = document.getElementById("qr_content_wifi_name").value;
    wifi_password = document.getElementById("qr_content_wifi_password").value;

    if (wifi_name == ""){
        alert("와이파이 이름을 입력해주세요.");
        return;
    }

    if (document.getElementById("is_hide").checked){
        qr.src = get_wifi_qrcode(wifi_name, wifi_password, "true");
    }else{
        qr.src = get_wifi_qrcode(wifi_name, wifi_password, "false");
    }
    qr.id = "qr_image";

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        qr.style.width = "500px";
    }

    qrcode_box.appendChild(qr)

    result_container.classList.remove("disabled");
}

function get_qrcode(content){
    return `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${content}`;
}

function get_wifi_qrcode(wifi_name, wifi_password, hide){
    return `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=WIFI:S:${wifi_name};T:WPA;P:${wifi_password};H:${hide};;`
}

password_hide = true;

function toggle_password_click(){
    password_hide = !password_hide;
    wifi_password_input = document.getElementById("qr_content_wifi_password");
    if (password_hide){
        toggle_password.src = "./image/hide_password.png";
        wifi_password_input.type = "password";
    }
    else{
        toggle_password.src = "./image/show_password.png";
        wifi_password_input.type = "text";
    }
}

function download_button_click(){
    qr = document.getElementById("qr_image");
    downloadImg(qr.src);
}

function downloadImg(imgSrc) {
    var image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgSrc;
    var fileName = "qr_code";
    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.getContext('2d').drawImage(this, 0, 0);
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(dataURLtoBlob(canvas.toDataURL()), fileName);
      } else {
        var link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = fileName;
        link.click();
      }
    };
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // 모바일인 경우
    document.styleSheets.item(0).disabled=true; // pc.css
    document.styleSheets.item(1).disabled=false; // mobile.css
    document.getElementById("text_button_image").style.width = "150px";
    document.getElementById("link_button_image").style.width = "150px";
    document.getElementById("wifi_button_image").style.width = "150px";
    document.getElementById("toggle_password").style.width = "45px";
}else{
    document.styleSheets.item(0).disabled=false; //pc.css
    document.styleSheets.item(1).disabled=true; //mobile.css
}