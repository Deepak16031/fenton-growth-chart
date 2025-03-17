import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Paper,
  useTheme
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDatabase } from '../context/DatabaseContext';
import { BabyProfile } from '../types';

interface ProfileFormData {
  name: string;
  dateOfBirth: string;
}

const ProfileManager: React.FC = () => {
  const theme = useTheme();
  const { 
    profiles, 
    createProfile, 
    updateProfile, 
    deleteProfile, 
    setCurrentProfile,
    currentProfile 
  } = useDatabase();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BabyProfile | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    dateOfBirth: new Date().toISOString().split('T')[0]
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<BabyProfile | null>(null);

  const handleOpenForm = (profile?: BabyProfile) => {
    if (profile) {
      setEditingProfile(profile);
      setFormData({
        name: profile.name,
        dateOfBirth: profile.dateOfBirth.split('T')[0]
      });
    } else {
      setEditingProfile(null);
      setFormData({
        name: '',
        dateOfBirth: new Date().toISOString().split('T')[0]
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProfile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const profileData: BabyProfile = {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        createdAt: new Date().toISOString()
      };

      if (editingProfile && editingProfile.id) {
        await updateProfile({
          ...profileData,
          id: editingProfile.id,
          createdAt: editingProfile.createdAt
        });
      } else {
        await createProfile(profileData);
      }

      handleCloseForm();
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleDeleteConfirm = (profile: BabyProfile) => {
    setProfileToDelete(profile);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (profileToDelete && profileToDelete.id) {
      try {
        await deleteProfile(profileToDelete.id);
        setShowDeleteConfirm(false);
        setProfileToDelete(null);
      } catch (error) {
        console.error('Failed to delete profile:', error);
      }
    }
  };

  const handleSelectProfile = (profile: BabyProfile) => {
    setCurrentProfile(profile);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: 3, 
        marginBottom: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h5" component="h2" color="primary">
          Baby Profiles
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          New Profile
        </Button>
      </Box>
      
      <Divider sx={{ marginBottom: 2 }} />
      
      {profiles.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', padding: 2 }}>
          No profiles yet. Create your first baby profile to start tracking growth.
        </Typography>
      ) : (
        <List>
          {profiles.map((profile) => (
            <React.Fragment key={profile.id}>
              <ListItem 
                button 
                onClick={() => handleSelectProfile(profile)}
                selected={currentProfile?.id === profile.id}
                sx={{
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: `${theme.palette.primary.light}30`,
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.light}50`,
                    }
                  }
                }}
              >
                <ListItemText 
                  primary={profile.name} 
                  secondary={`Born: ${new Date(profile.dateOfBirth).toLocaleDateString()}`} 
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenForm(profile);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConfirm(profile);
                    }}
                    sx={{ marginLeft: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
      
      {/* Profile Form Dialog */}
      <Dialog open={showForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProfile ? 'Edit Profile' : 'Create New Profile'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Baby's Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={!formData.name || !formData.dateOfBirth}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete {profileToDelete?.name}'s profile? This will delete all growth data for this profile.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProfileManager;