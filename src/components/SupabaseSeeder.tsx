import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { seedSupabaseAssets, clearSupabaseAssets, getSupabaseAssetCount, testInsertSingleAsset } from '../services/seedSupabase';
import { Database, Trash2, Loader2, TestTube } from 'lucide-react';

export function SupabaseSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [assetCount, setAssetCount] = useState<number | null>(null);

  const loadAssetCount = useCallback(async () => {
    const count = await getSupabaseAssetCount();
    setAssetCount(count);
  }, []);

  useEffect(() => {
    loadAssetCount();
  }, [loadAssetCount]);

  const handleSeed = async (count: number = 5000, useAutoId: boolean = false) => {
    setIsSeeding(true);
    setProgress(null);
    setResult(null);

    try {
      const seedResult = await seedSupabaseAssets(count, (current, total) => {
        setProgress({ current, total });
      }, useAutoId);

      setResult(
        `Successfully inserted ${seedResult.successful} assets. ${seedResult.failed > 0 ? `${seedResult.failed} failed.` : ''}`
      );
      await loadAssetCount();
      setTimeout(() => setResult(null), 5000);
    } catch (error: any) {
      setResult(`Error: ${error.message || 'Failed to seed database'}`);
      setTimeout(() => setResult(null), 5000);
    } finally {
      setIsSeeding(false);
      setProgress(null);
    }
  };

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear all assets from Supabase? This action cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    setResult(null);

    try {
      await clearSupabaseAssets();
      await loadAssetCount();
      setResult('All assets cleared successfully.');
      setTimeout(() => setResult(null), 5000);
    } catch (error: any) {
      setResult(`Error: ${error.message || 'Failed to clear database'}`);
      setTimeout(() => setResult(null), 5000);
    } finally {
      setIsClearing(false);
    }
  };

  const handleTest = async (useAutoId: boolean = false) => {
    setIsTesting(true);
    setResult(null);

    try {
      const testResult = await testInsertSingleAsset(useAutoId);
      if (testResult.success) {
        setResult(`✅ Test insert successful! Schema is compatible.${useAutoId ? ' (Using auto-generated ID)' : ''}`);
        await loadAssetCount();
      } else {
        setResult(`❌ Test insert failed: ${testResult.error}`);
      }
      setTimeout(() => setResult(null), 10000);
    } catch (error: any) {
      setResult(`❌ Test error: ${error.message || 'Failed to test'}`);
      setTimeout(() => setResult(null), 10000);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleTest(false)}
          disabled={isSeeding || isClearing || isTesting}
          className="text-xs"
        >
          {isTesting ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <TestTube className="w-3 h-3 mr-1" />
              Test Insert
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleTest(true)}
          disabled={isSeeding || isClearing || isTesting}
          className="text-xs"
          title="Test with auto-generated UUID"
        >
          Test (Auto ID)
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSeed(5000)}
          disabled={isSeeding || isClearing || isTesting}
          className="text-xs"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Seeding...
            </>
          ) : (
            <>
              <Database className="w-3 h-3 mr-1" />
              Seed Database (5K)
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSeed(1000)}
          disabled={isSeeding || isClearing}
          className="text-xs"
        >
          Seed 1K
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSeed(10000)}
          disabled={isSeeding || isClearing}
          className="text-xs"
        >
          Seed 10K
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={isSeeding || isClearing}
          className="text-xs text-red-600 hover:text-red-700"
        >
          {isClearing ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Clearing...
            </>
          ) : (
            <>
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={loadAssetCount}
          disabled={isSeeding || isClearing}
          className="text-xs"
        >
          Refresh Count
        </Button>
      </div>

      {progress && (
        <div className="text-xs text-gray-600">
          Progress: {progress.current.toLocaleString()} / {progress.total.toLocaleString()} (
          {Math.round((progress.current / progress.total) * 100)}%)
        </div>
      )}

      {result && (
        <div className={`text-xs ${result.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {result}
        </div>
      )}

      {assetCount !== null && (
        <div className="text-xs text-gray-500">
          Current assets in database: {assetCount.toLocaleString()}
        </div>
      )}
    </div>
  );
}

