---
title: "Lawyer Case Manager"
summary: "An offline-first Windows application that replaces a lawyer's paper notebook — cases, clients, notes, documents and court dates in one local file."
year: "2026"
role: "Coursework · 4th semester project"
tech: "C# · .NET 8 · WPF · SQLite"
image: "/images/projects/lawyer-case-manager.svg"
imageAlt: "Animated diagram of the application's four SQLite tables — Clients, Cases, Documents and CaseNotes — with a marker moving through them as each table lights up."
code: "https://github.com/rashidsami10000-afk/lawyers-case-management"
slug: "lawyer-case-manager"
---

## The problem

A lawyer's working memory lives in a paper notebook: case names, court numbers, hearing dates, and who said what and when. Moving that into software normally means a cloud service and somebody else's server, which is a hard sell when the contents are privileged client material.

## What I built

A Windows desktop application in C# and .NET 8 WPF, backed by a single local SQLite file. Nothing leaves the machine — no server, no account, no network call.

Four tables sit under `PRAGMA foreign_keys = ON`. Cases reference a client and fall back to `NULL` if that client is deleted; documents and notes cascade with the case they belong to. The interface covers the shape of the notebook: a case list with court name and status, a client directory, a chronological notes timeline, PDF contracts and evidence linked to their case, a court calendar for upcoming dates, and keyword search across cases and clients.

## Result

A working application that builds and runs from source in Visual Studio 2022 — roughly 550 lines of data access behind a 20 KB XAML window, with a database small enough to copy onto a USB stick.

## What I'd change

Search runs in memory over loaded records, which is fine at a few hundred cases and wrong at ten thousand; full-text search over an FTS5 table and an index on `Cases.ClientID` are the first fixes. The data layer is one 554-line helper class where client, case, document and note queries all live together — I would split it per entity and put the SQL behind a repository interface. And I committed `bin/` and `obj/`, which is why a small application is a 13 MB repository; a `.gitignore` would have cost nothing.
