'use client';
import React, { useEffect } from 'react';
import { httpGet } from '../services/_req';

const CategoryPage = () => {
	useEffect(() => {
		httpGet('/thumbnails').then((data) => console.log(data));
	}, []);
	return <div>CategoryPage</div>;
};

export default CategoryPage;
