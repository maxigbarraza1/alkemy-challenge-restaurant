export interface RecipeResults {
    results:      Recipe[];
    offset:       number;
    number:       number;
    totalResults: number;
}

export interface Recipe {
    id:        number;
    title:     string;
    image:     string;
    imageType: string;
}
