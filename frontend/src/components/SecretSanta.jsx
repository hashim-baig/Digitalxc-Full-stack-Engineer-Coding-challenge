import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, Gift } from 'lucide-react';

const SecretSanta = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }
    
    setFile(file);
    setError('');
  };

  const uploadEmployees = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-employees', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Employees uploaded successfully!');
        setError('');
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload employees');
    } finally {
      setLoading(false);
    }
  };

  const generateAssignments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-assignments', {
        method: 'POST',
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Secret Santa assignments generated successfully!');
        setError('');
      } else {
        setError(data.error || 'Generation failed');
      }
    } catch (err) {
      setError('Failed to generate assignments');
    } finally {
      setLoading(false);
    }
  };

  const downloadAssignments = async () => {
    try {
      const response = await fetch('/api/download-assignments');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'secret-santa-assignments.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError('Failed to download assignments');
      }
    } catch (err) {
      setError('Failed to download assignments');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            <Gift className="inline-block mr-2" />
            Secret Santa Organizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
              />
              <Button
                onClick={uploadEmployees}
                disabled={loading || !file}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </Button>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={generateAssignments}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <Gift className="w-4 h-4" />
                <span>Generate Assignments</span>
              </Button>

              <Button
                onClick={downloadAssignments}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Assignments</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretSanta;