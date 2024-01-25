<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    public function show(Category $category)
    {
        return CategoryResource::make($category);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->all());

        return new CategoryResource($category);
    }
}
