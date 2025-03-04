import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function FXHedgingDashboard() {
  const [hedgeAmount, setHedgeAmount] = useState(10000);
  const [expiry, setExpiry] = useState("3M");
  const [collateral, setCollateral] = useState("RMM-01 LP");
  const [forwardRate, setForwardRate] = useState(147.2);
  const [spotRate, setSpotRate] = useState(143.5);
  const [riskLevel, setRiskLevel] = useState(20);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4 flex justify-between">
          <div>
            <h2 className="text-xl font-bold">KES/USD Hedging Dashboard</h2>
            <p className="text-gray-500">Spot Price: {spotRate} KES/USD</p>
            <p className="text-gray-500">Forward Rate (3M): {forwardRate}</p>
          </div>
          <Button onClick={() => window.location.reload()}>Refresh Rates</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 grid grid-cols-4 gap-4">
          <div>
            <p>Hedge Size (USD)</p>
            <Input type="number" value={hedgeAmount} onChange={(e) => setHedgeAmount(Number(e.target.value))} />
          </div>
          <div>
            <p>Expiry</p>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger>{expiry}</SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="6M">6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p>Collateral Type</p>
            <Select value={collateral} onValueChange={setCollateral}>
              <SelectTrigger>{collateral}</SelectTrigger>
              <SelectContent>
                <SelectItem value="RMM-01 LP">RMM-01 LP</SelectItem>
                <SelectItem value="Stablecoin">Stablecoin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Hedge</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-4">Your Positions</h2>
          <div className="grid grid-cols-5 gap-4 text-gray-700 font-medium">
            <p>Hedge Amount</p>
            <p>Forward Rate</p>
            <p>Expiry</p>
            <p>P&L</p>
            <p>Actions</p>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-2">
            <p>{hedgeAmount} USD</p>
            <p>{forwardRate}</p>
            <p>{expiry}</p>
            <p className={riskLevel > 50 ? "text-red-500" : "text-green-500"}>-50 USD</p>
            <Button variant="outline">Manage</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-4">Risk Metrics & Analytics</h2>
          <p>Liquidation Risk: Low</p>
          <Progress value={riskLevel} className="mt-2" />
          <p className="mt-2">Implied Volatility: 8.2%</p>
          <p>Fees: 0.2%</p>
        </CardContent>
      </Card>
    </div>
  );
}
