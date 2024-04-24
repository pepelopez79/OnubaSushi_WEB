    // Animación fade-up
    $(document).ready(function() {
            $(window).scroll(function() {
                $('.fade-up').each(function() {
                    var position = $(this).offset().top;
                    var scrollPosition = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    if (position < scrollPosition + windowHeight - 200) {
                        $(this).addClass('active');
                    }
            });
        });
    });

    // Animación Secciones Menú
    $(document).ready(function() {
        $('section').not('#sopas, #ofertas').addClass('hidden');
        $('nav a').click(function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('section').not(target).not('#ofertas').addClass('hidden');
            $(target).removeClass('hidden');
        });
    });

    // Animación Eslogan
    function cambiarTextoAnimado(elemento, nuevoTexto) {
      var intervalo = 50;
      var caracteresPorPaso = 1;
      var textoActual = elemento.innerText;
      var longitud = Math.max(textoActual.length, nuevoTexto.length);
      var paso = 0;

      var interval = setInterval(function() {
          var textoParcial = nuevoTexto.slice(0, paso) + textoActual.slice(paso);
          elemento.innerText = textoParcial;
          paso += caracteresPorPaso;

          if (paso >= longitud) {
            clearInterval(interval);
            elemento.innerText = nuevoTexto;
          }
        }, intervalo);
    }

    function cambiarIdioma() {
      var titulo = document.getElementById('descripcion');
      var idiomaActual = titulo.dataset.idioma;

      if (idiomaActual === 'japones') {
        cambiarTextoAnimado(titulo, '¡Disfruta de la auténtica comida japonesa!');
        titulo.dataset.idioma = 'espanol';
      } else {
        cambiarTextoAnimado(titulo, '本物の日本食をお楽しみください！');
        titulo.dataset.idioma = 'japones';
      }
    }

    setTimeout(cambiarIdioma, 2000);

    // Canvas Logo
    var canvas = document.getElementById("logoCanvas");
    var ctx = canvas.getContext("2d");
    var amarillo = "#ffae42";
    var blanco = "#FFFFFF";
    var circleX = canvas.width / 2;
    var circleY = canvas.height / 2;
    var circleRadius = 50;
    var textSize = 26;
    var textSizeDelta = 0.02;
    var angle = 0;
    var rotationSpeed = 0.07;

    function drawCircle() {
      var gradient = ctx.createLinearGradient(circleX - circleRadius, circleY, circleX + circleRadius, circleY);
      gradient.addColorStop(0, "#ffae42");
      gradient.addColorStop(1, "#ff8148");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawText() {
      ctx.fillStyle = blanco;
      ctx.font = "bold " + textSize + "px Arial";
      ctx.textAlign = "center";
      ctx.fillText("ONUBA SUSHI", circleX, circleY + 8);
    }

    function animate() {
      textSize += textSizeDelta;
      if (textSize <= 26 || textSize >= 27) {
        textSizeDelta = -textSizeDelta;
      }

      angle += rotationSpeed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(circleX, circleY);
      ctx.rotate(angle);
      ctx.translate(-circleX, -circleY);
      drawCircle();
      ctx.restore();

      drawText();

      requestAnimationFrame(animate);
    }

    animate();

    // Animación Carrusel
    $(document).ready(function() {
        var totalSlides = $('.slide').length;
        var currentSlide = 0;
        function slide() {
            $('.slide').hide();
            $('.slide').eq(currentSlide).fadeOut(1000, function() {
                currentSlide++;
                if (currentSlide >= totalSlides) {
                    currentSlide = 0;
                }
                $('.slide').eq(currentSlide).fadeIn(1000);
            });
        }

        setTimeout(function() {
            slide();
            setInterval(slide, 7000);
        }, 0.0001);
    });

    // Animación Texto Carrusel
    function animateSlideText() {
      $('.slide-text').each(function() {
          var letters = $(this).find('h3, p');
          letters.css('opacity', '0')
          
          letters.each(function(index) {
              var letter = $(this);
              setTimeout(function() {
                  letter.animate({ opacity: '1' }, 500);
              }, index * 100);
          });
      });
    }

    animateSlideText();

    // Canvas Oferta
    const offerCanvas1 = document.querySelector('.offerCanvas');
    const ctx1 = offerCanvas1.getContext('2d');
    const emojis = ['💥', '💢', '🔥'];
    let scale1 = 1;
    let growing1 = true;
    let currentEmojiIndex = 0;

    function animateCanvas(ctx, scale, growing, emojis, currentEmojiIndex) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = 'blue';
        ctx.font = `${scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emojis[currentEmojiIndex], ctx.canvas.width / 2, ctx.canvas.height / 2);

        if (growing) {
            scale += 1;
        } else {
            scale -= 1;
        }

        if (scale > 20) {
            growing = false;
        } else if (scale < 2) {
            growing = true;
            currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
        }

        requestAnimationFrame(() => animateCanvas(ctx, scale, growing, emojis, currentEmojiIndex));
    }

    animateCanvas(ctx1, scale1, growing1, emojis, currentEmojiIndex);

    // SVG Oferta
    const svg = document.querySelector('.offerSVG');
    let scale = 1;
    let growing = true;

    function animateSVG() {
        const text = svg.querySelector('text');
        text.setAttribute('font-size', `${scale}px`);
        text.textContent = emojis[currentEmojiIndex];

        if (growing) {
            scale += 1;
        } else {
            scale -= 1;
        }

        if (scale > 20) {
            growing = false;
        } else if (scale < 2) {
            growing = true;
            currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
        }

        requestAnimationFrame(animateSVG);
    }

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', '50%');
    text.setAttribute('y', '50%');
    text.setAttribute('fill', 'blue');
    text.setAttribute('font-size', `${scale}px`);
    text.setAttribute('font-family', 'Arial');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.textContent = emojis[currentEmojiIndex];
    svg.appendChild(text);

    animateSVG();