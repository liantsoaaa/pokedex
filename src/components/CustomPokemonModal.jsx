import { useState } from "react";

const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const INITIAL_FORM = {
  name: "",
  imageUrl: "",
  types: [],
  hp: 50,
  description: "",
};

export function CustomPokemonModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTypeToggle = (type) => {
    setForm((prev) => {
      if (prev.types.includes(type)) {
        return { ...prev, types: prev.types.filter((t) => t !== type) };
      }
      if (prev.types.length >= 2) return prev;
      return { ...prev, types: [...prev.types, type] };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Le nom est obligatoire.";
    if (form.types.length === 0) newErrors.types = "Choisis au moins un type.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const success = onSubmit({
      name: form.name.trim(),
      imageUrl: form.imageUrl.trim() || null,
      types: form.types,
      hp: Number(form.hp),
      description: form.description.trim(),
    });
    if (success) {
      setForm(INITIAL_FORM);
      setErrors({});
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">Créer un Pokémon</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nom *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex: Flamouss"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image (URL) <span className="font-normal text-gray-400">— optionnel</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://exemple.com/pokemon.png"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Aperçu"
                onError={(e) => { e.target.style.display = "none"; }}
                className="mt-2 h-20 rounded-lg object-contain"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type(s) * <span className="font-normal text-gray-400">(max 2)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {POKEMON_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeToggle(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border-2 capitalize transition-colors ${
                    form.types.includes(type)
                      ? "border-indigo-500 bg-indigo-100 text-indigo-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.types && <p className="text-red-500 text-xs mt-1">{errors.types}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PV : <span className="text-indigo-600 font-bold">{form.hp}</span>
            </label>
            <input
              type="range"
              name="hp"
              min="1"
              max="255"
              value={form.hp}
              onChange={handleChange}
              className="w-full accent-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description <span className="font-normal text-gray-400">— optionnel</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Décris ton Pokémon..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}