import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeView from '@/features/Recipe/components/RecipeView/RecipeView';
import RecipeForm from '@/features/Recipe/components/RecipeForm/RecipeForm';

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isEditMode = location.pathname.includes('edit');
  const isCreateMode = location.pathname.includes('new');

  if (isCreateMode) {
    return <RecipeForm mode="create" />;
  }
  if (isEditMode) {
    return <RecipeForm mode="edit" />;
  }
  return <RecipeView recipeId={id}/>

};

export default RecipePage;
