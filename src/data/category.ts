export const categories = [
  {
    name: "Bridal Wear",
    label: "bridal_wear",
  },
  {
    name: "Casual Wear",
    label: "casual_wear",
  },
  {
    name: "Engagement",
    label: "engagement",
  },
  {
    name: "Morden Wear",
    label: "morden_wear",
  },
  {
    name: "Office Wear",
    label: "office_wear",
  },
  {
    name: "Traditional & Ethenic Wear",
    label: "traditional&etenic_wear",
  },
  {
    name: "Kids Wear",
    label: "kids_wear",
  },
];

export function getCategoryNameByLabel(label: string): string | undefined {
  const category = categories.find((cat) => cat.label === label);
  return category ? category.name : undefined;
}
