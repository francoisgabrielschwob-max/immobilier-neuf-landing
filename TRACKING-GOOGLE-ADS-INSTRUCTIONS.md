# 🎯 TRACKING GOOGLE ADS - INSTRUCTIONS COMPLÈTES

## ✅ STATUT ACTUEL

**Code installé sur :** `landing-neuf-excellence.html`  
**Date d'installation :** 28 janvier 2026  
**Statut :** ⚠️ En attente des IDs Google Ads réels

---

## 📋 CE QUI A ÉTÉ FAIT

### ✅ 1. Global Site Tag installé dans `<head>`

```html
<!-- Google Ads Global Site Tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXXX');
</script>
```

### ✅ 2. Script de détection de conversion installé avant `</body>`

Script intelligent qui :
- Détecte automatiquement le message de confirmation Microsoft Forms
- Envoie la conversion à Google Ads
- Affiche des logs dans la console pour le debug
- Supporte plusieurs langues (FR/EN)

---

## 🚀 PROCHAINES ÉTAPES

### ÉTAPE 1 : Créer l'action de conversion dans Google Ads

1. **Accéder à Google Ads**
   - Va sur https://ads.google.com/
   - Connecte-toi avec ton compte

2. **Créer l'action de conversion**
   - Clique sur **"Outils et paramètres"** (🔧 en haut à droite)
   - Dans le menu, clique sur **"Mesure" → "Conversions"**
   - Clique sur **"+ Nouvelle action de conversion"**
   - Sélectionne **"Site Web"**

3. **Configuration de l'action**
   - **Catégorie** : `Génération de prospects`
   - **Nom de la conversion** : `Lead Formulaire Landing Excellence`
   - **Valeur** : `30` (euros) - Valeur estimée d'un lead
   - **Nombre** : `Une`
   - **Fenêtre de conversion** : `30 jours`
   - **Fenêtre d'engagement vue** : `1 jour`
   - **Attribution** : `Basée sur les données`
   - **Inclure dans "Conversions"** : ✅ OUI
   
4. **Méthode de tracking**
   - Sélectionne **"Utiliser le code"**
   - Google va te donner 2 informations :

---

### ÉTAPE 2 : Récupérer les IDs Google Ads

Google Ads va te fournir :

**A) ID du compte (Conversion ID)** - Format : `AW-123456789`
- Trouvé dans : Outils → Configuration → Détails du compte
- Ou dans le code fourni après création de la conversion

**B) Libellé de conversion (Conversion Label)** - Format : `AbCdEfGhIj1KlMnOpQr`
- Fourni immédiatement après la création de l'action de conversion
- Apparaît dans le code Google Ads

**Exemple complet :**
```
ID compte : AW-123456789
Libellé : AbCdEfGhIj1KlMnOpQr
ID complet : AW-123456789/AbCdEfGhIj1KlMnOpQr
```

---

### ÉTAPE 3 : Remplacer les placeholders dans le code

**Fichier à modifier :** `landing-neuf-excellence.html`

**3 placeholders à remplacer :**

#### **Placeholder 1 & 2 : Dans le Global Site Tag (ligne ~33 et ~38)**

```html
<!-- AVANT -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXXX');
</script>

<!-- APRÈS (exemple avec ID réel) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-123456789"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-123456789');
</script>
```

#### **Placeholder 3 : Dans le script de détection (ligne ~277)**

```javascript
// AVANT
var CONVERSION_ID = 'AW-XXXXXXXXXX/AbCdEfGhIj1KlMnOpQr';

// APRÈS (exemple avec IDs réels)
var CONVERSION_ID = 'AW-123456789/AbCdEfGhIj1KlMnOpQr';
```

---

### ÉTAPE 4 : Uploader le fichier modifié sur GitHub

1. Télécharge `landing-neuf-excellence.html` depuis cette interface
2. Va sur GitHub : https://github.com/francoisgabrielschwob-max/immobilier-neuf-landing
3. Clique sur `landing-neuf-excellence.html`
4. Clique sur l'icône crayon ✏️ "Edit this file"
5. Supprime tout le contenu (Ctrl+A puis Suppr)
6. Copie-colle le nouveau contenu avec les IDs réels
7. Commit message : `Ajout tracking Google Ads avec IDs réels`
8. Clique sur "Commit changes"

**⏱️ Attendre 2-3 minutes** que GitHub Pages se mette à jour.

---

### ÉTAPE 5 : Tester le tracking

#### **Test 1 : Vérifier le chargement du script**

1. Ouvre https://excellence.fg-strategies.fr/landing-neuf-excellence.html
2. Ouvre la Console du navigateur (F12 → Console)
3. **Tu dois voir :**
   ```
   🔍 Tracking Google Ads initialisé - Surveillance active
   👀 Surveillance Microsoft Forms active - Prêt à détecter
   ```

#### **Test 2 : Tester une soumission de formulaire**

1. Remplis le formulaire avec des données de test
2. Soumets le formulaire
3. **Dans la console, tu dois voir :**
   ```
   ✅ Message de confirmation Microsoft Forms détecté !
   📝 Texte trouvé : [texte du message de confirmation]
   🎯 Conversion Google Ads envoyée avec succès !
   ✅ Conversion confirmée par Google Ads
   ```

#### **Test 3 : Vérifier dans Google Ads**

1. Va sur Google Ads → Outils → Conversions
2. Clique sur ton action "Lead Formulaire Landing Excellence"
3. Vérifie l'état :
   - **"Non vérifiée"** → Normal au début
   - **"Enregistrement récent"** → Le pixel fonctionne ! ✅
   - **"Aucun événement récent"** → Problème à investiguer

**Délai :** Les conversions peuvent prendre 1-3 heures pour apparaître dans Google Ads.

---

## 🐛 TROUBLESHOOTING

### Problème : Le message de console n'apparaît pas

**Solution :**
- Vider le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
- Vérifier que le fichier a bien été mis à jour sur GitHub Pages
- Attendre 5 minutes après l'upload GitHub

### Problème : "gtag is not defined"

**Solution :**
- Vérifier que l'ID compte `AW-XXXXXXXXXX` a bien été remplacé dans le Global Site Tag
- Vérifier qu'il n'y a pas de bloqueur de publicité actif
- Vérifier la Console pour d'autres erreurs JavaScript

### Problème : Conversion pas détectée après soumission

**Solution :**
- Vérifier que le message de confirmation Microsoft Forms s'affiche bien
- Regarder dans la Console quel texte est détecté
- Si nécessaire, ajouter le texte exact dans la liste `motsConfirmation`

### Problème : Conversion pas visible dans Google Ads après 3 heures

**Solution :**
- Vérifier l'ID de conversion dans le script (ligne ~277)
- Format attendu : `AW-123456789/AbCdEfGhIj1KlMnOpQr`
- Vérifier qu'il n'y a pas d'espace ou de caractère en trop
- Contacter le support Google Ads

---

## 📊 MONITORING

### KPIs à surveiller après lancement

| Métrique | Où la trouver | Objectif |
|----------|---------------|----------|
| **Conversions** | Google Ads → Conversions | 30-50/mois |
| **Taux de conversion** | Google Ads → Campagnes | >2% |
| **Coût par conversion** | Google Ads → Campagnes | <40€ |
| **Taux de clics (CTR)** | Google Ads → Annonces | >3% |

### Vérifications hebdomadaires

- [ ] Conversions enregistrées correctement
- [ ] Pas d'erreur dans la Console du site
- [ ] Correspondance Excel ↔ Google Ads (~100% attendu)
- [ ] Budget dépensé vs leads générés

---

## 🔗 RESSOURCES

- **Site web :** https://excellence.fg-strategies.fr/landing-neuf-excellence.html
- **Google Ads :** https://ads.google.com/
- **GitHub Repository :** https://github.com/francoisgabrielschwob-max/immobilier-neuf-landing
- **Aide Google Ads - Suivi des conversions :** https://support.google.com/google-ads/answer/1722022

---

## 📞 SUPPORT

En cas de problème, vérifie :
1. Les logs de la Console navigateur (F12)
2. L'état des conversions dans Google Ads
3. Que les 3 placeholders ont bien été remplacés

**Date de dernière mise à jour :** 28 janvier 2026  
**Version du script :** 1.0  
**Compatibilité :** Microsoft Forms + GitHub Pages
