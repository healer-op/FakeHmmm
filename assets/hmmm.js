const click = new Audio("assets/click.mp3");
const params = new URLSearchParams(document.location.search);
var co = params.get("country");
if(!co){
    co = "US"
}

(async () => {
    let data = await (await fetch(`https://randomuser.me/api/?nat=${co}`)).json();

    console.log(data.results[0].picture.large)
    document.getElementById("src").src = data.results[0].picture.large
    document.getElementById("fullName").innerText = data.results[0].name.title + " " +
        data.results[0].name.first + " " +
        data.results[0].name.last

    document.getElementById("age").innerText = data.results[0].dob.age
    document.getElementById("dob").innerText = (data.results[0].dob.date).split("T")[0]

    document.getElementById("address").innerText = data.results[0].location.street.number + " " +
        data.results[0].location.street.name + " " + data.results[0].location.city + " " + data.results[0].location.state + " " + data.results[0].location.country + " " + data.results[0].location.postcode

    document.getElementById("phone").innerText = data.results[0].phone
    document.getElementById("ssn").innerText = data.results[0].id.value
    country = document.getElementById("country")
    country.value = co
})();

function copyClip(x) {
    click.pause();
    click.currentTime = 0;
    click.play()
    var copyText = document.getElementById(`${x}`);
    navigator.clipboard.writeText(copyText.innerHTML);
    let some = document.getElementById("some")
    some.innerText = "copied to clipboard"
    setTimeout(function () {
        some.innerText = ""
    }, 1000);
}


async function refresh() {
    click.pause();
    click.currentTime = 0;
    click.play()
    country = document.getElementById("country")
    setTimeout(function () {
        window.location.href=(window.location.href).split("?country")[0] + `?country=${country.value}`
    }, 500);

}

function changed(){
    click.pause();
    click.currentTime = 0;
    click.play()
    country = document.getElementById("country")
    setTimeout(function () {
        window.location.href=(window.location.href).split("?country")[0] + `?country=${country.value}`
    }, 500);
}