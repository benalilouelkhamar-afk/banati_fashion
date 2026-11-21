# BANATI FASHION — site de la boutique 🎀

Site vitrine **statique** (React + Vite + Tailwind) pour BANATI FASHION, boutique de mode femme à Kenitra.
Pas de serveur, pas de base de données : le panier reste dans le téléphone de la cliente (localStorage)
et chaque commande part sur **WhatsApp** (+212 644 01 45 42), paiement à la livraison.

## Pages
- `/` Accueil — `/boutique` Boutique (filtres, tri, recherche) — `/produit/produit-001` Fiche produit
- `/panier` Panier + formulaire de commande WhatsApp — `/notre-histoire` — `/contact` — `/faq`
- Français par défaut, bouton **العربية** en haut pour passer en arabe (droite → gauche).

---

## ✏️ Modifier les produits (sans savoir coder)

Tous les produits sont dans **un seul fichier** : `src/data/products.json`.
Sur GitHub : ouvrez ce fichier → cliquez sur le crayon ✏️ → modifiez → **Commit changes**.
Vercel / Netlify remettent le site à jour tout seuls en 1–2 minutes.

Chaque produit ressemble à ça :

```json
{
  "id": 12,
  "slug": "produit-012",
  "name_fr": "Veste en jean imprimée",
  "name_ar": "جاكيت جينز مطبوع",
  "category": "vestes-jean",
  "price": 299,
  "old_price": null,
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Bleu jean", "Gris"],
  "images": ["/images/products/product_012.jpg", "/images/products/product_033.jpg"],
  "description_fr": "Texte en français…",
  "description_ar": "النص بالعربية…",
  "is_new": false,
  "in_stock": true
}
```

| Je veux… | Je change… |
|---|---|
| **Changer un prix** | `"price": 299` → `"price": 349` (chiffre seul, sans "DH") |
| **Mettre en promo** | `"old_price": 399` (ancien prix barré) et `"price": 299`. Sans promo : `"old_price": null` |
| **Changer le nom** | `name_fr` (français) et `name_ar` (arabe) |
| **Changer la description** | `description_fr` et `description_ar` |
| **Badge « Nouveau »** | `"is_new": true` (les 8 premiers « nouveaux » apparaissent en accueil) |
| **Rupture de stock** | `"in_stock": false` (badge « Rupture de stock », achat bloqué) |
| **Tailles** | `"sizes": ["S", "M", "L"]` ou `["36", "38", "40"]` |
| **Couleurs** | `"colors": ["Noir", "Beige"]` (une couleur connue affiche une pastille, voir `COLOR_HEX` dans `src/data/config.js`) |
| **Catégorie** | une de : `vestes-jean`, `manteaux-vestes`, `cardigans-mailles`, `ensembles`, `jeans`, `pulls` |

⚠️ Gardez les guillemets `"…"`, les virgules entre les lignes, et `true` / `false` / `null` sans guillemets.
Si le site affiche une page blanche après une modification, c'est souvent une virgule oubliée.

### Ajouter un produit
1. Mettez la photo dans `public/images/products/` (format portrait 4:5, ex. 720×900 px, `.jpg`), ex. `product_075.jpg`.
2. Dans `products.json`, copiez un bloc `{ … }` existant, collez-le à la fin (avec une virgule avant),
   et changez `id` (numéro unique), `slug` (ex. `produit-075`, sans espaces ni accents), le nom, le prix et `images`.

### Changer / ajouter des photos
- Remplacez simplement le fichier `public/images/products/product_0XX.jpg` en gardant **le même nom**.
- Plusieurs photos pour un produit : ajoutez-les dans `"images": [ … ]` (la 1ʳᵉ est la photo principale).
- Une photo manquante affiche un joli cadre « Banati » à la place.

> 📸 **À compléter** : les photos `product_001` à `product_047` sont déjà en place.
> Les produits **048 à 074** attendent encore leur photo (`product_048.jpg` … `product_074.jpg`),
> leur nom et leur catégorie. Tous les prix sont à **299 DH** par défaut.

## ⚙️ Autres réglages
- Numéro WhatsApp, Instagram, carte Google Maps, liste des villes : `src/data/config.js`
- Photos des tuiles de catégories : `CATEGORIES` dans `src/data/config.js`
- Tous les textes du site : `src/i18n/fr.json` (français) et `src/i18n/ar.json` (arabe)
- Horaires d'ouverture : `contact.hoursText` dans les deux fichiers de langue
- Avis clientes : section « Vos avis » dans `src/pages/Home.jsx` (cartes vides pour l'instant)
- Photo d'accueil : `public/images/site/hero.jpg`

## 💻 Pour le développeur
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # site prêt dans dist/
```
Déploiement : **Vercel** ou **Netlify** → importer le dépôt, build `npm run build`, dossier `dist`.
`vercel.json` et `public/_redirects` gèrent les liens directs (ex. `/produit/produit-012`).
GitHub Pages : utiliser un domaine personnalisé (ou adapter `base` dans `vite.config.js`) ; `404.html` est généré au build.
