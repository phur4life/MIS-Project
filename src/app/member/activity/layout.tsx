"use client";

import React from "react";
import Layout from "@/components/Layout1/Layout";


export default function ActivityLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Layout>{children}</Layout>;
}
