#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Bundle Analysis Script for ng-shadcn Components
 * Analyzes bundle sizes and provides optimization recommendations
 */

const COMPONENTS = [
  'button', 'input', 'card', 'switch', 'dialog', 'tooltip',
  'select', 'checkbox', 'radio-group', 'textarea', 'badge', 'alert',
  'tabs', 'dropdown-menu', 'popover', 'accordion'
];

const TARGET_SIZE_KB = 10; // Target: < 10KB gzipped per component

class BundleAnalyzer {
  constructor() {
    this.results = [];
    this.distPath = path.join(process.cwd(), 'dist');
  }

  async analyze() {
    console.log('🔍 Starting Bundle Analysis...\n');
    
    // Ensure all components are built
    await this.buildAllComponents();
    
    // Analyze each component
    for (const component of COMPONENTS) {
      const analysis = await this.analyzeComponent(component);
      this.results.push(analysis);
    }
    
    // Generate report
    this.generateReport();
  }

  async buildAllComponents() {
    console.log('📦 Building all components...');
    try {
      const buildCommand = COMPONENTS.map(comp => `ng build ${comp}`).join(' && ');
      execSync(buildCommand, { stdio: 'inherit' });
      console.log('✅ All components built successfully\n');
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  async analyzeComponent(componentName) {
    const componentPath = path.join(this.distPath, componentName);
    
    if (!fs.existsSync(componentPath)) {
      return {
        name: componentName,
        error: 'Component not found in dist folder',
        size: 0,
        gzipSize: 0,
        status: '❌'
      };
    }

    try {
      // Get main bundle files
      const files = fs.readdirSync(componentPath);
      const jsFiles = files.filter(f => f.endsWith('.js') && !f.includes('.map'));
      const dtsFiles = files.filter(f => f.endsWith('.d.ts'));
      
      let totalSize = 0;
      let gzipSize = 0;
      
      // Calculate sizes
      for (const file of jsFiles) {
        const filePath = path.join(componentPath, file);
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
        
        // Estimate gzip size (roughly 30% of original size)
        gzipSize += Math.round(stats.size * 0.3);
      }
      
      const sizeKB = Math.round(totalSize / 1024 * 100) / 100;
      const gzipKB = Math.round(gzipSize / 1024 * 100) / 100;
      
      return {
        name: componentName,
        size: sizeKB,
        gzipSize: gzipKB,
        files: jsFiles.length,
        typeFiles: dtsFiles.length,
        status: gzipKB <= TARGET_SIZE_KB ? '✅' : '⚠️',
        recommendation: this.getRecommendation(gzipKB, jsFiles.length)
      };
    } catch (error) {
      return {
        name: componentName,
        error: error.message,
        size: 0,
        gzipSize: 0,
        status: '❌'
      };
    }
  }

  getRecommendation(gzipKB, fileCount) {
    const recommendations = [];
    
    if (gzipKB > TARGET_SIZE_KB) {
      recommendations.push('Optimize bundle size');
    }
    
    if (fileCount > 3) {
      recommendations.push('Consider code splitting');
    }
    
    if (gzipKB > 15) {
      recommendations.push('Review dependencies');
    }
    
    return recommendations.length > 0 ? recommendations : ['Optimized'];
  }

  generateReport() {
    console.log('📊 Bundle Analysis Report');
    console.log('=' .repeat(80));
    console.log();
    
    // Summary table
    console.log('Component'.padEnd(15) + 'Size (KB)'.padEnd(12) + 'Gzipped'.padEnd(12) + 'Status'.padEnd(8) + 'Recommendation');
    console.log('-'.repeat(80));
    
    let totalSize = 0;
    let totalGzip = 0;
    let optimizedCount = 0;
    
    for (const result of this.results) {
      if (result.error) {
        console.log(`${result.name.padEnd(15)}ERROR: ${result.error}`);
        continue;
      }
      
      totalSize += result.size;
      totalGzip += result.gzipSize;
      
      if (result.status === '✅') {
        optimizedCount++;
      }
      
      const recommendation = Array.isArray(result.recommendation) 
        ? result.recommendation.join(', ') 
        : result.recommendation;
      
      console.log(
        result.name.padEnd(15) +
        result.size.toFixed(2).padEnd(12) +
        result.gzipSize.toFixed(2).padEnd(12) +
        result.status.padEnd(8) +
        recommendation
      );
    }
    
    console.log('-'.repeat(80));
    console.log(
      'TOTAL'.padEnd(15) +
      totalSize.toFixed(2).padEnd(12) +
      totalGzip.toFixed(2).padEnd(12) +
      `${optimizedCount}/${this.results.length}`.padEnd(8) +
      'components optimized'
    );
    
    console.log();
    console.log('📈 Summary:');
    console.log(`• Total components: ${this.results.length}`);
    console.log(`• Optimized components: ${optimizedCount}`);
    console.log(`• Total bundle size: ${totalSize.toFixed(2)} KB`);
    console.log(`• Total gzipped size: ${totalGzip.toFixed(2)} KB`);
    console.log(`• Average per component: ${(totalGzip / this.results.length).toFixed(2)} KB gzipped`);
    
    // Recommendations
    const needsOptimization = this.results.filter(r => r.status === '⚠️');
    if (needsOptimization.length > 0) {
      console.log();
      console.log('🔧 Components needing optimization:');
      needsOptimization.forEach(comp => {
        console.log(`• ${comp.name}: ${comp.gzipSize.toFixed(2)} KB (target: ${TARGET_SIZE_KB} KB)`);
      });
    }
    
    // Save report to file
    this.saveReport();
  }

  saveReport() {
    const reportData = {
      timestamp: new Date().toISOString(),
      target: `${TARGET_SIZE_KB} KB gzipped`,
      components: this.results,
      summary: {
        total: this.results.length,
        optimized: this.results.filter(r => r.status === '✅').length,
        totalSize: this.results.reduce((sum, r) => sum + r.size, 0),
        totalGzipSize: this.results.reduce((sum, r) => sum + r.gzipSize, 0)
      }
    };
    
    const reportPath = path.join(process.cwd(), 'reports', 'bundle-analysis.json');
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);
  }
}

// Run analysis if called directly
if (require.main === module) {
  const analyzer = new BundleAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = BundleAnalyzer;
