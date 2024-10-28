import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, MicOff, Upload } from 'lucide-react';
import { ItemCard } from './item-card';
import { TEMPLATES } from '@/lib/templates';
import { processContent } from '@/lib/content-processor';
import { ItemsByCategory, TemplateConfig } from '@/types';

export const ParaApp: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig>(TEMPLATES.PARA);
  const [items, setItems] = useState<ItemsByCategory>({});
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');

  // Initialize items state when template changes
  useEffect(() => {
    const newItems: ItemsByCategory = {};
    Object.keys(selectedTemplate.categories).forEach(category => {
      newItems[category] = [];
    });
    setItems(newItems);
    setActiveTab(Object.keys(selectedTemplate.categories)[0]);
  }, [selectedTemplate]);

  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition: any = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
  }

  useEffect(() => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      
      if (event.results[current].isFinal) {
        const newItems = processContent(transcript, selectedTemplate);
        addItems(newItems);
      }
    };

    recognition.onerror = (event: any) => {
      setError(`Error occurred in recognition: ${event.error}`);
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [selectedTemplate]);

  const addItems = (newItems: any[]) => {
    setItems(prev => {
      const updated = { ...prev };
      newItems.forEach(item => {
        if (!updated[item.category]) {
          updated[item.category] = [];
        }
        updated[item.category].push(item);
      });
      return updated;
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const newItems = processContent(text, selectedTemplate);
      addItems(newItems);
    } catch (err: any) {
      setError('Error reading file: ' + err.message);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const toggleItemComplete = (category: string, index: number) => {
    setItems(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => 
        i === index ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const archiveItems = (category: string) => {
    setItems(prev => {
      const itemsToArchive = prev[category].filter(item => item.completed);
      const remainingItems = prev[category].filter(item => !item.completed);
      
      return {
        ...prev,
        [category]: remainingItems,
        ARCHIVES: [...(prev.ARCHIVES || []), ...itemsToArchive]
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Note Organization System</CardTitle>
            <Select 
              value={selectedTemplate.id}
              onValueChange={(value) => setSelectedTemplate(
                TEMPLATES[Object.keys(TEMPLATES).find(key => 
                  TEMPLATES[key].id === value
                ) || 'PARA']
              )}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TEMPLATES).map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <template.icon className="w-4 h-4" />
                      {template.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={toggleListening}
                variant={isListening ? "