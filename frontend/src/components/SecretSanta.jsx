import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, Gift } from 'lucide-react';

const SecretSanta = () => {
  const [employeesFile, setEmployeesFile] = useState(null);
  const [assignmentsFile, setAssignmentsFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a valid CSV file');
      return;
    }

    if (type === 'employees') {
      setEmployeesFile(file);
    } else {
      setAssignmentsFile(file);
    }

    setError('');
  };

  const uploadFiles = async () => {
    if (!employeesFile || !assignmentsFile) {
      setError('Please select both files before uploading');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('employees', employeesFile);
    formData.append('previousAssignments', assignmentsFile);

    try {
      const response = await fetch('/api/upload-data', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Files uploaded successfully!');
        setError('');
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload files');
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
          <div className='flex-col justify-center'>
            <div className="flex-col items-center">
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
            </div>


            <div className="flex-col justify-center items-center">
              <div className="flex justify-center space-y-4">
                {/* Employee Data Upload */}
                <div className="flex-col justify-center space-x-4">
                  <p>Employee Data</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e, 'employees')}
                    className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                  />
                </div>

                {/* Previous Assignments Upload */}
                <div className="flex-col justify-center space-x-4">
                  <p>Previous Assignment Data</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e, 'assignments')}
                    className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                  />
                </div>
              </div>


              <div className="flex justify-center">
                <Button
                  onClick={uploadFiles}
                  disabled={loading || !employeesFile || !assignmentsFile}
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </Button>
              </div>

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
