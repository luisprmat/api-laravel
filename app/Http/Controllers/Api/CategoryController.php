<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['ability:categories-list'])->only('index');
        $this->middleware('ability:categories-show')->only('show');
    }

    public function index()
    {
        $categories = Category::withCount('products')->get();

        return CategoryResource::collection($categories);
    }

    public function show(Category $category)
    {
        return CategoryResource::make($category);
    }

    public function store(StoreCategoryRequest $request)
    {
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $name = 'categories/'.Str::uuid().'.'.$file->extension();
            $file->storePubliclyAs('/', $name);
            $data['photo'] = $name;
        }

        $category = Category::create($data);

        return new CategoryResource($category);
    }

    public function update(Category $category, StoreCategoryRequest $request)
    {
        $data = $request->all();

        if ($request->has('delete_photo') && $request->boolean('delete_photo')) {
            $this->removePhoto($category);
            $data['photo'] = null;
            unset($data['delete_photo']);
        }

        if ($request->hasFile('photo')) {
            $this->removePhoto($category);

            $file = $request->file('photo');
            $name = 'categories/'.Str::uuid().'.'.$file->extension();
            $file->storePubliclyAs('/', $name);
            $data['photo'] = $name;
        }

        $category->update($data);

        return CategoryResource::make($category);
    }

    public function destroy(Category $category)
    {
        $category->loadCount('products');

        if ($category->products_count) {
            return response()->json([
                'message' => __('You cannot delete a category with associated products.'),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->removePhoto($category);

        $category->delete();

        return response()->noContent();
    }

    private function removePhoto(Category $category): void
    {
        if ($category->photo) {
            if (Storage::exists($category->photo)) {
                Storage::delete($category->photo);
            }
        }
    }
}
