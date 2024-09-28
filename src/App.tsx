import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

interface WeatherInfo {
  temperature: number;
  condition: string;
  icon: string;
}

const defaultWeather: WeatherInfo = {
  temperature: 25,
  condition: 'Sunny',
  icon: 'https://openweathermap.org/img/wn/01d.png',
};

const WeatherWidget: React.FC<{ weather: WeatherInfo; onRemove: () => void }> = ({
  weather,
  onRemove,
}) => {
  return (
    <Card variant="outlined" style={{ backgroundColor: '#f0f4f8', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ color: '#3f51b5' }}>
          {weather.temperature}°C
        </Typography>
        <Typography variant="h6" style={{ margin: '8px 0', color: '#757575' }}>
          {weather.condition}
        </Typography>
        <img src={weather.icon} alt={weather.condition} style={{ width: 60, height: 60 }} />
        <div style={{ marginTop: '16px' }}>
          <IconButton color="secondary" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const [weatherWidgets, setWeatherWidgets] = useState<WeatherInfo[]>([]);

  useEffect(() => {
    const savedWidgets = localStorage.getItem('weatherWidgets');
    if (savedWidgets) {
      setWeatherWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherWidgets', JSON.stringify(weatherWidgets));
  }, [weatherWidgets]);

  const handleAddWidget = () => {
    setWeatherWidgets((prev) => [...prev, defaultWeather]);
  };

  const handleRemoveWidget = (index: number) => {
    setWeatherWidgets((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddWidget} style={{ marginBottom: '16px' }}>
        Add Weather Widget
      </Button>
      <Grid container spacing={3}>
        {weatherWidgets.map((weather, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <WeatherWidget weather={weather} onRemove={() => handleRemoveWidget(index)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const App: React.FC = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', backgroundColor: '#e8eaf6', minHeight: '100vh' }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom style={{ color: '#3f51b5' }}>
          Weather Dashboard
        </Typography>
        <Dashboard />
      </div>
    </ThemeProvider>
  );
};

export default App;
