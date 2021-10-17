var loki = document.getElementById("loki");
var thorE = document.getElementById("thorE");
var thorH = document.getElementById("thorH");
var btn = document.getElementsByClassName("btn");
var attackBtn = document.getElementById("attackBtn");
var purify1 = document.getElementById("purify1");
var purify2 = document.getElementById("purify2");
var damage = document.getElementById("damage");
var bonus = document.getElementById("bonus");
var purify = document.getElementById("purify");
var dragonBar = document.getElementById("dragonBar");
var fighterBar = document.getElementById("fighterBar");
var asgard = document.getElementById("asgard");
var mode = "";

for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", btnClick);
}
loki.addEventListener("click", playLoki);
thorE.addEventListener("click", playThorE);
thorH.addEventListener("click", function () {
    playThorE();
    playThorH();
});
attackBtn.addEventListener("click", attack);
purify1.addEventListener("click", function () {
    if (y <= 1140) {
        purify1.style.display = "none";
        purify.innerHTML = "You used your purification skill <br> +360 HP";
        y = y + 360;
        document.getElementById("fighterHP").innerHTML = y + " HP";
        fighterBar.value = y;
    } else {
        purify.innerHTML = "Your HP must be less than 1140 to use purification skill";
    }
});
purify2.addEventListener("click", function () {
    if (y <= 1140) {
        purify2.style.display = "none";
        purify.innerHTML = "You used your purification skill <br> +360 HP";
        y = y + 360;
        document.getElementById("fighterHP").innerHTML = y + " HP";
        fighterBar.value = y;
    } else {
        purify.innerHTML = "Your HP must be less than 1140 to use purification skill";
    }
});
// Game mode Buttons
function btnClick() {
    document.getElementById("dragon").src = "images/dragon.png";
    attackBtn.style.display = "inline";
    bonus.innerHTML = "";
    damage.innerHTML = "";
    purify.innerHTML = "";
    document.getElementById("fire").innerHTML = "";
    document.getElementById("fireRounds").innerHTML = "";
    dragonBar.style.display = "inline";
    bonus.style.color = "black";
    asgard.style.backgroundImage = "url('images/midgard.jpg')";

}
// Loki button
function playLoki() {
    document.getElementById("fighter").src = "images/loki.png";
    document.getElementById("fighter").style.width = "95%";
    mode = "loki";
    purify1.style.display = "none";
    purify2.style.display = "none";
    document.getElementById("dragonHP").innerHTML = "50 HP";
    document.getElementById("fighterHP").innerHTML = "";
    attackBtn.disabled = false;
    fighterBar.style.display = "none";
    dragonBar.max = "50";
    dragonBar.value = "50";
    count = 0;
    yd = 50;
}
// Thor: simple button
function playThorE() {
    document.getElementById("fighter").src = "images/thor.png";
    document.getElementById("fighter").style.width = "90%";
    mode = "thorE";
    purify1.style.display = "none";
    purify2.style.display = "none";
    document.getElementById("dragonHP").innerHTML = "2000 HP";
    document.getElementById("fighterHP").innerHTML = "1500 HP";
    attackBtn.disabled = false;
    fighterBar.style.display = "inline";
    dragonBar.max = "2000";
    dragonBar.value = "2000";
    fighterBar.max = "1500";
    fighterBar.value = "1500";
    yd = 2000;
    y = 1500;
}
// Thor: advanced button
function playThorH() {
    document.getElementById("fighter").src = "images/thor.png";
    mode = "thorH";
    purify1.style.display = "inline";
    purify2.style.display = "inline";
    fireAttack = [0, 0, 0];
}
// Attack button
function attack() {
    bonus.innerHTML = "";
    //Loki mode
    if (mode == "loki") {
        count++;
        x = getRandom(10, 21);
        var critical = getRandom(0, 101);
        if (critical < 10) {
            x = x * 2;
            bonus.innerHTML = "Critical damage";
        }
        damage.innerHTML = "-" + x + " HP";
        yd = yd - x;
        document.getElementById("dragonHP").innerHTML = yd + " HP";
        dragonBar.value = yd;
        if (count == 3 || yd <= 0) {
            attackBtn.disabled = true;
            setTimeout(function () {
                if (yd > 0) {
                    bonus.style.color = "#f44336";
                    bonus.innerHTML = "You lose";
                } else {
                    bonus.style.color = "green";
                    bonus.innerHTML = "You win";
                }
            }, 500);
        }
        //Thor simple mode
    } else if (mode == "thorE" || mode == "thorH") {
        damage.innerHTML = "";
        x = getRandom(78, 99);
        xd = getRandom(92, 123);
        var mjolnir = getRandom(0, 101);
        var cdg = getRandom(0, 101);
        var evade = getRandom(0, 101);
        if (mjolnir < 20) {
            x = x + 200;
            damage.innerHTML = "Mjolnir attack";
        }
        if (cdg < 15) {
            x = x * 4;
            damage.innerHTML += "<br>" + "Coup de gr&#226;ce";
        }
        if (evade > 35) {
            yd = yd - x;
        } else {
            damage.innerHTML += "<br>" + "You missed";
            x = 0;
        }
        y = y - xd;
        document.getElementById("dragonHP").innerHTML = yd + " HP";
        dragonBar.value = yd;
        damage.innerHTML += "<br>" + "-" + x + " dragon HP";
        if (yd > 0) {
            var timeout = setTimeout(function () {
                bonus.innerHTML = "-" + xd + " HP";
                document.getElementById("fighterHP").innerHTML = y + " HP";
                fighterBar.value = y;
            }, 1500);
        }
        if (yd <= 0 || y <= 0) {
            attackBtn.disabled = true;
            if (y >= yd) {
                setTimeout(function () {
                    bonus.style.color = "green";
                    bonus.innerHTML = "You win";
                }, 2000);
                //Thor advanced mode
            } else {
                setTimeout(function () {
                    bonus.style.color = "#f44336";
                    bonus.innerHTML = "You lose";
                }, 2000);
            }
        }
    }
    if (mode == "thorH") {
        y = y + xd;
        document.getElementById("purify").innerHTML = "";
        document.getElementById("fire").innerHTML = "";
        document.getElementById("fireRounds").innerHTML = "";
        var fire = getRandom(0, 101);
        if (fireAttack[0] != 0) {
            for (var k = 0; k < fireAttack[0]; k++) {
                document.getElementById("fire").innerHTML += "<br> Fire attack";
            }
        }
        xd = xd + fireAttack[0] * getRandom(25, 36) * 2;
        fireAttack.shift();
        fireAttack[2] = 0;
        y = y - xd;
        if (fire < 30) {
            fireAttack[0]++;
            fireAttack[1]++;
            fireAttack[2]++;
            document.getElementById("fireRounds").innerHTML = "Fire attack for the next 3 rounds";
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}