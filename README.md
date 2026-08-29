# ShopSphere — Auto-Scaling E-Commerce Platform

A modern full-stack e-commerce application built to demonstrate practical **DevOps and Kubernetes concepts**.

## 🛠️ Tech Stack

- **Next.js + TypeScript** — Application
- **Tailwind CSS** — UI
- **PostgreSQL** — Database
- **Docker** — Containerization
- **Kubernetes + Minikube** — Container orchestration
- **NGINX Ingress** — HTTP routing
- **HPA** — Horizontal Pod Autoscaling

## 🚀 What This Project Demonstrates

- Dockerized Next.js application
- Kubernetes Deployment and Pods
- Multiple replicas and self-healing
- Kubernetes Service
- Horizontal Pod Autoscaling (**2–6 Pods, 50% CPU target**)
- ConfigMaps and Secrets
- NGINX Ingress
- PostgreSQL connectivity
- Health checks and production builds

### Auto-Scaling Demo

Under load, ShopSphere was tested scaling:

`3 Pods → 6 Pods`

After the load was removed:

`6 Pods → 2 Pods`

This demonstrates both automatic scale-up and scale-down.

## 🏗️ Architecture

```text
User
 ↓
NGINX Ingress
 ↓
Kubernetes Service
 ↓
ShopSphere Pods
 ↓
PostgreSQL (S25 / Termux)
```

HPA monitors CPU metrics and adjusts the number of ShopSphere Pods according to demand.

## 📁 Project Structure

```text
Devops-Auto-Scalling/
├── app/
├── components/
├── lib/
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   ├── configmap.yaml
│   └── ingress.yaml
├── Dockerfile
└── README.md
```

## ▶️ Run Locally

```bash
npm install
npm run db:setup
npm run db:seed
npm run dev
```

## ☸️ Run with Kubernetes

```bash
minikube start
minikube image load shopsphere:1.0
kubectl apply -f k8s/
```

Check the deployment:

```bash
kubectl get pods
kubectl get deployment
kubectl get service
kubectl get hpa
kubectl get ingress
```

## 🎯 Project Goal

The goal of ShopSphere is to demonstrate how a modern web application can be **containerized, deployed, exposed, securely configured, and automatically scaled using Kubernetes**.

> **Note:** This is a learning/demo project. Payment functionality is test-only and no real payment processing is implemented.
