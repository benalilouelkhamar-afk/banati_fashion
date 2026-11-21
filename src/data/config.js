// ⚙️ Réglages de la boutique — modifiez ici le numéro, l'adresse, etc.
export const SHOP = {
  name: 'BANATI FASHION',
  whatsapp: '212644014542', // format international, sans + ni espaces
  phoneDisplay: '+212 6 44 01 45 42',
  instagram: 'https://www.instagram.com/banati_fashion_by_dona/',
  instagramHandle: '@banati_fashion_by_dona',
  mapsEmbed: 'https://www.google.com/maps?q=Rue+Challa,+Ville+Haute,+Kenitra,+Morocco&output=embed',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Rue+Challa+Ville+Haute+Kenitra',
}

// Catégories (l'ordre = l'ordre d'affichage). "cover" = photo de la tuile en accueil.
export const CATEGORIES = [
  { id: 'vestes-jean', cover: '/images/products/product_006.jpg' },
  { id: 'manteaux-vestes', cover: '/images/products/product_016.jpg' },
  { id: 'cardigans-mailles', cover: '/images/products/product_043.jpg' },
  { id: 'ensembles', cover: '/images/products/product_019.jpg' },
  { id: 'jeans', cover: '/images/products/product_008.jpg' },
  { id: 'pulls', cover: '/images/products/product_015.jpg' },
]

// Couleurs connues → pastille. Une couleur absente s'affiche juste en texte.
export const COLOR_HEX = {
  Noir: '#1f1a17', Blanc: '#ffffff', Ivoire: '#fbf6ea', 'Crème': '#efe3cf', Beige: '#d9c3a5',
  Chocolat: '#4A2C21', Bordeaux: '#6B1E2B', Rose: '#E8C4C4', 'Bleu jean': '#5B7BA0',
  'Bleu clair': '#9fb6d0', 'Bleu ciel': '#bcd3ea', 'Bleu marine': '#1f2b4a', Gris: '#9a9a9a', Kaki: '#6b6a45',
}

export const CITIES = [
  'Kenitra', 'Rabat', 'Salé', 'Témara', 'Casablanca', 'Mohammedia', 'Fès', 'Meknès', 'Marrakech', 'Tanger',
  'Tétouan', 'Agadir', 'Oujda', 'Nador', 'Al Hoceima', 'El Jadida', 'Safi', 'Essaouira', 'Béni Mellal',
  'Khouribga', 'Settat', 'Berrechid', 'Khémisset', 'Sidi Kacem', 'Sidi Slimane', 'Sidi Yahya El Gharb',
  'Souk El Arbaa', 'Larache', 'Ksar El Kebir', 'Asilah', 'Chefchaouen', 'Ouazzane', 'Taza', 'Errachidia',
  'Ouarzazate', 'Taroudant', 'Tiznit', 'Guelmim', 'Laâyoune', 'Dakhla', 'Ifrane', 'Azrou', 'Khénifra',
  'Berkane', 'Fnideq', 'Martil', 'Bouznika', 'Skhirat', 'Benslimane', 'Youssoufia', 'Kelaat Sraghna',
  'Autre ville',
]

export const waLink = (text = '') =>
  `https://wa.me/${SHOP.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// Ouvre WhatsApp dans un nouvel onglet ; si le navigateur bloque (ex. navigateur Instagram), on ouvre dans la page.
export const openWhatsApp = (url) => {
  const w = window.open(url, '_blank')
  if (w) { try { w.opener = null } catch { /* ignore */ } } else { window.location.href = url }
}
