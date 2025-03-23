import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  Menu,
  MenuItem,
  Chip,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Slider,
  FormControlLabel,
  Switch,
  Collapse,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

const SearchFilter = ({
  onSearch,
  onFilter,
  searchPlaceholder = 'Search...',
  filterOptions = [],
  showAdvancedFilters = true,
  initialFilters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = {
      ...filters,
      [filterKey]: value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const renderFilterChips = () => {
    return Object.entries(filters).map(([key, value]) => {
      if (!value) return null;
      
      const option = filterOptions.find(opt => opt.key === key);
      if (!option) return null;

      return (
        <Chip
          key={key}
          label={`${option.label}: ${value}`}
          onDelete={() => handleFilterChange(key, '')}
          sx={{ m: 0.5 }}
        />
      );
    });
  };

  const renderAdvancedFilters = () => {
    return (
      <Collapse in={showAdvanced}>
        <Box sx={{ p: 2, pt: 0 }}>
          <Grid container spacing={2}>
            {filterOptions.map((option) => {
              switch (option.type) {
                case 'select':
                  return (
                    <Grid item xs={12} sm={6} md={4} key={option.key}>
                      <FormControl fullWidth size="small">
                        <InputLabel>{option.label}</InputLabel>
                        <Select
                          value={filters[option.key] || ''}
                          onChange={(e) => handleFilterChange(option.key, e.target.value)}
                          label={option.label}
                        >
                          {option.options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  );

                case 'range':
                  return (
                    <Grid item xs={12} sm={6} md={4} key={option.key}>
                      <Typography gutterBottom>{option.label}</Typography>
                      <Slider
                        value={filters[option.key] || [option.min, option.max]}
                        onChange={(_, value) => handleFilterChange(option.key, value)}
                        valueLabelDisplay="auto"
                        min={option.min}
                        max={option.max}
                        marks
                      />
                    </Grid>
                  );

                case 'switch':
                  return (
                    <Grid item xs={12} sm={6} md={4} key={option.key}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={filters[option.key] || false}
                            onChange={(e) => handleFilterChange(option.key, e.target.checked)}
                          />
                        }
                        label={option.label}
                      />
                    </Grid>
                  );

                default:
                  return null;
              }
            })}
          </Grid>
        </Box>
      </Collapse>
    );
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFilterClick}
            >
              Filters
            </Button>
            {Object.keys(filters).length > 0 && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            )}
            {showAdvancedFilters && (
              <IconButton
                onClick={() => setShowAdvanced(!showAdvanced)}
                color={showAdvanced ? 'primary' : 'default'}
              >
                {showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>

      {Object.keys(filters).length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {renderFilterChips()}
          </Box>
        </Box>
      )}

      {showAdvancedFilters && renderAdvancedFilters()}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option.key}
            onClick={() => {
              handleFilterChange(option.key, option.defaultValue);
              handleFilterClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};

export default SearchFilter; 