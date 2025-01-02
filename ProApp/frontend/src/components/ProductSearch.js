import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
  Button,
} from '@mui/material';

function ProductSearch({ categories, onSearch }) {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: [0, 1000],
    minRating: 0,
    sort: ''
  });

  const handleChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const handlePriceChange = (_, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search products"
          value={filters.search}
          onChange={handleChange('search')}
          fullWidth
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            onChange={handleChange('category')}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sort}
            onChange={handleChange('sort')}
            label="Sort By"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price_asc">Price: Low to High</MenuItem>
            <MenuItem value="price_desc">Price: High to Low</MenuItem>
            <MenuItem value="rating_desc">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ px: 2 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Apply Filters
      </Button>
    </Box>
  );
}

export default ProductSearch; 