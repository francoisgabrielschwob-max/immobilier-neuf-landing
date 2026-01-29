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
    
    // Remplir les champs cachés SEULEMENT s'ils existent
    const utmSourceField = document.getElementById('utm_source');
    const utmCampaignField = document.getElementById('utm_campaign');
    const utmAdgroupField = document.getElementById('utm_adgroup');
    const utmTermField = document.getElementById('utm_term');
    const utmContentField = document.getElementById('utm_content');
    
    if (utmSourceField) utmSourceField.value = utmParams.utm_source;
    if (utmCampaignField) utmCampaignField.value = utmParams.utm_campaign;
    if (utmAdgroupField) utmAdgroupField.value = utmParams.utm_adgroup;
    if (utmTermField) utmTermField.value = utmParams.utm_term;
    if (utmContentField) utmContentField.value = utmParams.utm_content;
    
    // Log pour debug (à retirer en production)
    console.log('UTM Parameters captured:', utmParams);
    
    // ✅ ATTACHER L'ÉVÉNEMENT AU FORMULAIRE
    const premiumForm = document.getElementById('premiumLeadForm');
    if (premiumForm) {
        premiumForm.addEventListener('submit', submitPremiumLead);
        console.log('✅ Formulaire premium initialisé');
    }
});

// ============================================
// FORMULAIRE PREMIUM PERSONNALISÉ
// ============================================

// ⚠️ CONFIGURATION IMPORTANTE : URL du webhook Power Automate
// Remplacez cette URL par celle fournie par Power Automate (HTTP Request)
const POWER_AUTOMATE_WEBHOOK_URL = 'https://default95e2642c307a49d8b4811b70a66b7f.58.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/b64782df66bc4d71a2c9a2bf2eb8f605/triggers/manual/paths/invoke?api-version=1';

/**
 * Soumettre le formulaire premium
 * Envoie les données à Power Automate + déclenche la conversion Google Ads
 */
async function submitPremiumLead(event) {
    event.preventDefault();
    
    console.log('📝 Soumission du formulaire premium...');
    
    // Récupérer le formulaire et le bouton
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Désactiver le bouton et afficher le loader
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const leadData = {
        prenom: formData.get('prenom'),
        nom: formData.get('nom'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        projet: formData.get('projet') || 'Non renseigné',
        source: 'Landing Neuf Excellence',
        date: new Date().toISOString(),
        url: window.location.href
    };
    
    console.log('📊 Données du lead:', leadData);
    
    try {
        // Vérifier que l'URL du webhook est configurée
        if (POWER_AUTOMATE_WEBHOOK_URL === 'COLLE_TON_URL_ICI') {
            throw new Error('⚠️ URL du webhook Power Automate non configurée !');
        }
        
        // Envoyer les données à Power Automate
        console.log('📤 Envoi vers Power Automate...');
        const response = await fetch(POWER_AUTOMATE_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leadData)
        });
        
        if (!response.ok) {
            throw new Error(`Erreur Power Automate: ${response.status}`);
        }
        
        console.log('✅ Données envoyées à Power Automate avec succès !');
        
        // Envoyer la conversion à Google Ads
        if (typeof gtag !== 'undefined') {
            console.log('🎯 Envoi de la conversion Google Ads...');
            
            gtag('event', 'conversion', {
                'send_to': 'AW-16583907507/aRcACInstO4bELOx6eM9',
                'event_callback': function() {
                    console.log('✅ Conversion Google Ads confirmée');
                }
            });
            
            // Envoyer aussi l'événement generate_lead
            gtag('event', 'generate_lead', {
                'event_category': 'Formulaire',
                'event_label': 'Lead Immobilier Neuf Excellence Premium',
                'value': 1
            });
            
            console.log('✅ Conversion Google Ads envoyée avec succès !');
        } else {
            console.warn('⚠️ gtag non disponible - Conversion Google Ads non envoyée');
        }
        
        // Afficher le message de succès
        showSuccessMessage();
        
    } catch (error) {
        console.error('❌ Erreur lors de la soumission:', error);
        
        // Réactiver le bouton
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        
        // Afficher le message d'erreur
        showErrorMessage();
    }
}

/**
 * Afficher le message de succès
 */
function showSuccessMessage() {
    const form = document.getElementById('premiumLeadForm');
    const successMsg = document.getElementById('successMessage');
    
    // Masquer le formulaire
    form.style.display = 'none';
    
    // Afficher le message de succès avec animation
    successMsg.style.display = 'block';
    successMsg.style.opacity = '0';
    
    setTimeout(() => {
        successMsg.style.transition = 'opacity 0.5s ease';
        successMsg.style.opacity = '1';
    }, 50);
    
    // Scroll vers le haut du message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('🎉 Message de succès affiché !');
}

/**
 * Afficher le message d'erreur
 */
function showErrorMessage() {
    const form = document.getElementById('premiumLeadForm');
    const errorMsg = document.getElementById('errorMessage');
    
    // Masquer le formulaire
    form.style.display = 'none';
    
    // Afficher le message d'erreur avec animation
    errorMsg.style.display = 'block';
    errorMsg.style.opacity = '0';
    
    setTimeout(() => {
        errorMsg.style.transition = 'opacity 0.5s ease';
        errorMsg.style.opacity = '1';
    }, 50);
    
    // Scroll vers le haut du message
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('❌ Message d\'erreur affiché');
}

/**
 * Réinitialiser le formulaire (après une erreur)
 */
function resetForm() {
    const form = document.getElementById('premiumLeadForm');
    const errorMsg = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Réafficher le formulaire
    form.style.display = 'block';
    form.reset();
    
    // Masquer le message d'erreur
    errorMsg.style.display = 'none';
    
    // Réactiver le bouton
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    
    // Scroll vers le formulaire
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    console.log('🔄 Formulaire réinitialisé');
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
