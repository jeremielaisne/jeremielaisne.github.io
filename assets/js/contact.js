/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

(function(){

    var nb = 0;

    document.getElementById("contact-form").onsubmit = function(e) {

        e.preventDefault();
        var societe_html = document.querySelector("input[name='name']");
        var societe = societe_html.value;
        var email_html = document.querySelector("input[name='email']");
        var email = email_html.value;
        var message_html = document.querySelector("textarea[name='message']");
        var message = message_html.value;
        
        if(societe === "") {
            var error_societe = document.getElementById("error_societe");
            error_societe.classList.remove("d-none");
            var input_societe = document.getElementById('input_societe');
            input_societe.classList.remove("grey-border");
            input_societe.classList.add("red-border");
        }
        if(email === "") {
            var error_email = document.getElementById("error_email");
            error_email.classList.remove("d-none");
            var input_email = document.getElementById('input_email');
            input_email.classList.remove("grey-border");
            input_email.classList.add("red-border");
        }
        if(message === "") {
            var error_msg = document.getElementById("error_msg");
            error_msg.classList.remove("d-none");
            var input_msg = document.getElementById('textarea_msg');
            input_msg.classList.remove("grey-border");
            input_msg.classList.add("red-border");
        }

        if(societe && email && message) {
            var error_societe = document.getElementById("error_societe");
                error_societe.classList.add("d-none");
            var input_societe = document.getElementById('input_societe');
                input_societe.classList.remove("red-border");
                input_societe.classList.add("grey-border");
            var error_email = document.getElementById("error_email");
                error_email.classList.add("d-none");
            var input_email = document.getElementById('input_email');
                input_email.classList.remove("red-border");
                input_email.classList.add("grey-border");
            var error_msg = document.getElementById("error_msg");
                error_msg.classList.add("d-none");
            var input_msg = document.getElementById('textarea_msg');
                input_msg.classList.remove("red-border");
                input_msg.classList.add("grey-border");

            var submit_msg = document.getElementById('submit_msg');
            if (submit_msg !== null) {
                submit_msg.classList.remove("d-none");
            }

            if(nb < 3){
                alert("Vous venez de m'envoyer + de 2 messages successifs. Merci de ne pas spammer.");
            }

            if(nb < 3) {
                Email.send({
                    SecureToken : "2fe8c4f6-0994-4d43-b2b6-037565e36b60",
                    To : ['admin@jeremie-laisne.fr', 'laisne.jeremie83@gmail.com'],
                    From : "admin@jeremie-laisne.fr",
                    Subject : `Contact site - ${societe}`,
                    Body : `Vous avez reçu un nouveau message :::: Societé : ${societe} :::: Email : ${email} :::: Message : ${message}`
                }).then(
                    message => console.log("Message envoyé!"),
                    nb++
                );
            }
        }
    }

})();
