"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

interface EvolutionData {
  day: number;
  skillsLearned: number;
  cumulativeSkills: number;
  income: number;
  cumulativeIncome: number;
  surprisesDelivered: number;
}

interface D3EvolutionChartProps {
  data: EvolutionData[];
  width?: number;
  height?: number;
}

export function D3EvolutionChart({ 
  data, 
  width = 800, 
  height = 400 
}: D3EvolutionChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create gradient defs
    const defs = svg.append("defs");
    
    // Green gradient for skills
    const skillsGradient = defs.append("linearGradient")
      .attr("id", "skills-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    skillsGradient.append("stop").attr("offset", "0%").attr("stop-color", "#576953").attr("stop-opacity", 0.8);
    skillsGradient.append("stop").attr("offset", "100%").attr("stop-color", "#576953").attr("stop-opacity", 0.1);

    // Rose gradient for income
    const incomeGradient = defs.append("linearGradient")
      .attr("id", "income-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    incomeGradient.append("stop").attr("offset", "0%").attr("stop-color", "#CC8B86").attr("stop-opacity", 0.8);
    incomeGradient.append("stop").attr("offset", "100%").attr("stop-color", "#CC8B86").attr("stop-opacity", 0.1);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([1, Math.max(30, d3.max(data, d => d.day) || 30)])
      .range([0, innerWidth]);

    const yScaleSkills = d3.scaleLinear()
      .domain([0, Math.max(14, d3.max(data, d => d.cumulativeSkills) || 14)])
      .range([innerHeight, 0]);

    const yScaleIncome = d3.scaleLinear()
      .domain([0, Math.max(700, d3.max(data, d => d.cumulativeIncome) || 700)])
      .range([innerHeight, 0]);

    // Grid lines
    const gridLines = g.append("g").attr("class", "grid");
    
    // X grid
    gridLines.selectAll(".x-grid")
      .data(xScale.ticks(7))
      .enter()
      .append("line")
      .attr("class", "x-grid")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#262b26")
      .attr("stroke-width", 1)
      .attr("opacity", 0.5);

    // Y grid
    gridLines.selectAll(".y-grid")
      .data(yScaleSkills.ticks(5))
      .enter()
      .append("line")
      .attr("class", "y-grid")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => yScaleSkills(d))
      .attr("y2", d => yScaleSkills(d))
      .attr("stroke", "#262b26")
      .attr("stroke-width", 1)
      .attr("opacity", 0.5);

    // Line generators
    const skillsLine = d3.line<EvolutionData>()
      .x(d => xScale(d.day))
      .y(d => yScaleSkills(d.cumulativeSkills))
      .curve(d3.curveMonotoneX);

    const incomeLine = d3.line<EvolutionData>()
      .x(d => xScale(d.day))
      .y(d => yScaleIncome(d.cumulativeIncome))
      .curve(d3.curveMonotoneX);

    // Area generators
    const skillsArea = d3.area<EvolutionData>()
      .x(d => xScale(d.day))
      .y0(innerHeight)
      .y1(d => yScaleSkills(d.cumulativeSkills))
      .curve(d3.curveMonotoneX);

    const incomeArea = d3.area<EvolutionData>()
      .x(d => xScale(d.day))
      .y0(innerHeight)
      .y1(d => yScaleIncome(d.cumulativeIncome))
      .curve(d3.curveMonotoneX);

    // Add areas (fill under lines)
    g.append("path")
      .datum(data)
      .attr("fill", "url(#skills-gradient)")
      .attr("d", skillsArea)
      .attr("opacity", 0);

    g.append("path")
      .datum(data)
      .attr("fill", "url(#income-gradient)")
      .attr("d", incomeArea)
      .attr("opacity", 0);

    // Animate areas
    g.selectAll("path[fill='url(#skills-gradient)']")
      .transition()
      .duration(1000)
      .delay(200)
      .attr("opacity", 1);

    g.selectAll("path[fill='url(#income-gradient)']")
      .transition()
      .duration(1000)
      .delay(400)
      .attr("opacity", 1);

    // Add lines
    const skillsPath = g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#576953")
      .attr("stroke-width", 3)
      .attr("d", skillsLine);

    const incomePath = g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#CC8B86")
      .attr("stroke-width", 3)
      .attr("d", incomeLine);

    // Animate lines
    const skillsLength = skillsPath.node()?.getTotalLength() || 0;
    const incomeLength = incomePath.node()?.getTotalLength() || 0;

    skillsPath
      .attr("stroke-dasharray", skillsLength)
      .attr("stroke-dashoffset", skillsLength)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    incomePath
      .attr("stroke-dasharray", incomeLength)
      .attr("stroke-dashoffset", incomeLength)
      .transition()
      .duration(1500)
      .delay(300)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    // Add dots for each data point
    g.selectAll(".skills-dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "skills-dot")
      .attr("cx", d => xScale(d.day))
      .attr("cy", d => yScaleSkills(d.cumulativeSkills))
      .attr("r", 0)
      .attr("fill", "#576953")
      .attr("stroke", "#191D19")
      .attr("stroke-width", 2)
      .transition()
      .duration(500)
      .delay((d, i) => 1000 + i * 50)
      .attr("r", 5);

    // Axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(7)
      .tickFormat(d => `Day ${d}`);

    const yAxisSkills = d3.axisLeft(yScaleSkills)
      .ticks(5)
      .tickFormat(d => `${d} skills`);

    const yAxisIncome = d3.axisRight(yScaleIncome)
      .ticks(5)
      .tickFormat(d => `$${d}`);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "#6a7d65")
      .attr("font-size", "11px");

    g.select(".domain").attr("stroke", "#262b26");
    g.selectAll(".tick line").attr("stroke", "#262b26");

    // Y axis (skills)
    g.append("g")
      .call(yAxisSkills)
      .selectAll("text")
      .attr("fill", "#576953")
      .attr("font-size", "11px");

    // Y axis (income)
    g.append("g")
      .attr("transform", `translate(${innerWidth},0)`)
      .call(yAxisIncome)
      .selectAll("text")
      .attr("fill", "#CC8B86")
      .attr("font-size", "11px");

    // Legend
    const legend = g.append("g").attr("transform", `translate(${innerWidth - 150}, 10)`);
    
    legend.append("line")
      .attr("x1", 0)
      .attr("x2", 20)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#576953")
      .attr("stroke-width", 3);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 4)
      .attr("fill", "#F1F7ED")
      .attr("font-size", "12px")
      .text("Skills");

    legend.append("line")
      .attr("x1", 0)
      .attr("x2", 20)
      .attr("y1", 20)
      .attr("y2", 20)
      .attr("stroke", "#CC8B86")
      .attr("stroke-width", 3);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 24)
      .attr("fill", "#F1F7ED")
      .attr("font-size", "12px")
      .text("Income");

  }, [data, width, height]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-auto"
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="mx-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </motion.div>
  );
}

// Generate sample evolution data for the week
export function generateEvolutionData(): EvolutionData[] {
  const data: EvolutionData[] = [];
  let cumulativeSkills = 0;
  let cumulativeIncome = 0;

  for (let day = 1; day <= 7; day++) {
    const skillsLearned = day <= 1 ? 0 : 2; // 2 skills per day after day 1
    const income = day <= 1 ? 0 : 100; // $100/day target
    
    cumulativeSkills += skillsLearned;
    cumulativeIncome += income;

    data.push({
      day,
      skillsLearned,
      cumulativeSkills,
      income,
      cumulativeIncome,
      surprisesDelivered: Math.max(0, (day - 1) * 2),
    });
  }

  return data;
}
