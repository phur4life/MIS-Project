"use client";

import React from "react";
import DefaultLayout from "../../components/Layout/DefaultLayout";

export default function ActivityLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DefaultLayout>{children}</DefaultLayout>;
}
