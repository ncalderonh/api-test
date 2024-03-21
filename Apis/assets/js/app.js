// Crea un fondo al Navbar
const navEL = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
        navEL.classList.add('bg-body-tertiary');
    } else if (window.scrollY < 56) {
        navEL.classList.remove('bg-body-tertiary');
    }
});

$(document).ready(function () {
    $('#search-form').submit(function (event) {
        event.preventDefault();
        var heroId = $('#hero-id').val().trim();

        // Valida que el ID ingresado sea un número
        if (!/^\d+$/.test(heroId)) {
            alert('Por favor, ingrese un número válido para el ID del Superhéroe.');
            return;
        }

        // Realiza la consulta a la API de SuperHero para obtener la información básica
        var apiKey = '4905856019427443';
        var apiUrl = 'https://www.superheroapi.com/api.php/' + apiKey + '/' + heroId;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (response) {
                // Realiza la consulta a la API de SuperHero para obtener las estadísticas de poder
                var apiUrlPowerstats = apiUrl + '/powerstats';
                $.ajax({
                    url: apiUrlPowerstats,
                    type: 'GET',
                    success: function (responsePowerstats) {
                        // Combina la información básica con las estadísticas de poder
                        var hero = Object.assign({}, response, responsePowerstats);

                        // Realiza la consulta a la API de SuperHero para obtener la apariencia
                        var apiUrlAppearance = apiUrl + '/appearance';
                        $.ajax({
                            url: apiUrlAppearance,
                            type: 'GET',
                            success: function (responseAppearance) {
                                // Combina la información básica con la apariencia
                                hero.appearance = responseAppearance;

                                // Realiza la consulta a la API de SuperHero para obtener las conexiones
                                var apiUrlConnections = apiUrl + '/connections';
                                $.ajax({
                                    url: apiUrlConnections,
                                    type: 'GET',
                                    success: function (responseConnections) {
                                        // Combina la información básica con las conexiones
                                        hero.connections = responseConnections;

                                        // Realiza la consulta a la API de SuperHero para obtener la imagen
                                        var apiUrlImage = apiUrl + '/image';
                                        $.ajax({
                                            url: apiUrlImage,
                                            type: 'GET',
                                            success: function (responseImage) {
                                                // Combina la información básica con la imagen
                                                hero.image = responseImage;

                                                // Te lleva a la información del superhéroe cuando realizas la busqueda
                                                displayHeroInfo(hero);
                                                $('html, body').animate({
                                                    scrollTop: $('#chart-section').offset().top
                                                }, 1000);
                                            },
                                            error: function () {
                                                alert('No se pudo obtener la información de la imagen del Superhéroe. Por favor, inténtelo nuevamente más tarde.');
                                            }
                                        });
                                    },
                                    error: function () {
                                        alert('No se pudo obtener la información de las conexiones del Superhéroe. Por favor, inténtelo nuevamente más tarde.');
                                    }
                                });
                            },
                            error: function () {
                                alert('No se pudo obtener la información de la apariencia del Superhéroe. Por favor, inténtelo nuevamente más tarde.');
                            }
                        });
                    },
                    error: function () {
                        alert('No se pudo obtener la información de las estadísticas de poder del Superhéroe. Por favor, inténtelo nuevamente más tarde.');
                    }
                });
            },
            error: function () {
                alert('No se pudo obtener la información del Superhéroe. Por favor, inténtelo nuevamente más tarde.');
            }
        });
    });

    function displayHeroInfo(hero) {
        var heroInfo = $('#hero-info');
        heroInfo.empty();

        // Crea tarjeta para mostrar la información del superhéroe
        var card = $('<div class="card">');
        var cardBody = $('<div class="card-body">');
        cardBody.append('<h2 class="card-title text-warning">' + hero.name + '</h2>');
        cardBody.append('<img src="' + hero.image.url + '" class="img-fluid rounded-start mb-3" alt="' + hero.name + '">');
        cardBody.append('<p class="card-text">Nombre completo: ' + hero.biography['full-name'] + '</p>');
        cardBody.append('<p class="card-text">Alias: ' + hero.biography.aliases.join(', ') + '</p>');
        cardBody.append('<p class="card-text">Editora: ' + hero.biography.publisher + '</p>');
        cardBody.append('<p class="card-text">Primera aparición: ' + hero.biography['first-appearance'] + '</p>');
        cardBody.append('<p class="card-text">Género: ' + hero.appearance.gender + '</p>');
        cardBody.append('<p class="card-text">Raza: ' + hero.appearance.race + '</p>');
        cardBody.append('<p class="card-text">Color de cabello: ' + hero.appearance['hair-color'] + '</p>');
        cardBody.append('<p class="card-text">Color de ojos: ' + hero.appearance['eye-color'] + '</p>');
        cardBody.append('<p class="card-text">Conexiones: ' + hero.connections.groupAffiliation + '</p>');
        card.append(cardBody);
        heroInfo.append(card);

        // Llama a la función para mostrar el gráfico
        displayPieChart(hero);
    }

    function displayPieChart(hero) {
        // Crea el gráfico con fondo transparente
        var chartContainer = $('<div id="chart-container" style="height: 300px; width: 50%; background-color: rgba(0, 0, 0, 0);"></div>');
        var chart = $('<div id="chart" style="height: 100%;"></div>');
        chartContainer.append(chart);
        $('#hero-info').append(chartContainer);

        var dataPoints = [
            { label: "Inteligencia", y: parseInt(hero.powerstats.intelligence) },
            { label: "Fuerza", y: parseInt(hero.powerstats.strength) },
            { label: "Velocidad", y: parseInt(hero.powerstats.speed) },
            { label: "Durabilidad", y: parseInt(hero.powerstats.durability) },
            { label: "Poder", y: parseInt(hero.powerstats.power) },
            { label: "Combate", y: parseInt(hero.powerstats.combat) }
        ];

        var chart = new CanvasJS.Chart("chart", {
            animationEnabled: true,
            backgroundColor: "transparent",
            title: {
            text: "Estadísticas de Poder",
            fontColor: "#ffc107"
            },
            data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0\"%\"",
            indexLabel: "{label} {y}",
            indexLabelFontColor: "#ffc107",
            dataPoints: dataPoints
            }]
            });

        chart.render();
    }
});
