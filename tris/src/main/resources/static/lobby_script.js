console.log("JS lobby caricato");

document.querySelector('.swap').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('existing_lobby').style.display = 'none';
    document.getElementById('new_lobby').style.display = 'flex';
});

document.getElementById('existing_lobby').addEventListener('submit', function(e){
    e.preventDefault()
    console.log("submit existing preso");
    const lobby_code = document.getElementById('ex_lobby_code').value;
    sessionStorage.setItem('lobby_code', lobby_code);
    sessionStorage.setItem('this_symbol', "1");
    window.location.href = "/game.html";
});

document.getElementById('new_lobby').addEventListener('submit', function(e){
    e.preventDefault()
    console.log("submit new preso");
    const lobby_code = document.getElementById('new_lobby_code').value;
    sessionStorage.setItem('lobby_code', lobby_code);
    sessionStorage.setItem('this_symbol', "0");
    window.location.href = "/game.html";
});