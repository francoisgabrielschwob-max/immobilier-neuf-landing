// ============================================
// LANDING PAGE - UTM TRACKING & FORM HANDLING
// ============================================

// Fonction pour extraire les paramètres UTM de l'URL
function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_adgroup: urlParams.get('utm_adgroup') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || ''
    };
}

// Remplir les champs cachés UTM au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const utmParams = getUTMParameters();
    
    // Remplir les champs cachés
    document.getElementById('utm_source').value = utmParams.utm_source;
    document.getElementById('utm_campaign').value = utmParams.utm_campaign;
    document.getElementById('utm_adgroup').value = utmParams.utm_adgroup;
    document.getElementById('utm_term').value = utmParams.utm_term;
    document.getElementById('utm_content').value = utmParams.utm_content;
    
    // Log pour debug (à retirer en production)
    console.log('UTM Parameters captured:', utmParams);
});

// Gestion du formulaire
const form = document.getElementById('fgLeadForm');
const successMessage = document.getElementById('fgSuccess');
const errorMessage = document.getElementById('fgError');

if (form) {
    form.addEventListener('submit', function(e) {
        // Netlify Forms gère la soumission automatiquement
        // On masque juste le formulaire et affiche un message
        
        // Note: Pour Netlify Forms, on laisse la soumission naturelle se faire
        // Le code ci-dessous est pour l'affichage du message de succès après redirection
        
        // Si vous voulez gérer l'affichage sans redirection, décommenter :
        /*
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Google Analytics event (si GA configuré)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Lead',
                    'event_label': 'Landing Neuf Excellence'
                });
            }
            
            // Google Ads conversion (à configurer avec votre ID)
            // gtag('event', 'conversion', {'send_to': 'AW-XXXXX/XXXXX'});
        })
        .catch(() => {
            form.style.display = 'none';
            errorMessage.style.display = 'block';
        });
        */
    });
}

// Smooth scroll vers le formulaire quand on clique sur les CTA
document.querySelectorAll('a[href="#demande"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#demande');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Focus sur le premier champ après le scroll
            setTimeout(function() {
                const firstInput = target.querySelector('input[name="prenom"]');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 500);
        }
    });
});

// Détection si l'utilisateur vient d'une page "thank you" Netlify
// (Netlify redirige vers /thank-you ou /?success=true après soumission)
if (window.location.search.includes('success=true') || window.location.pathname.includes('thank-you')) {
    if (form) {
        form.style.display = 'none';
    }
    if (successMessage) {
        successMessage.style.display = 'block';
    }
}
