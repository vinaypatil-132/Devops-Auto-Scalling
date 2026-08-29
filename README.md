# ShopSphere — Auto-Scaling E-Commerce Platform

A modern containerized e-commerce platform built to demonstrate practical **DevOps, Docker, and Kubernetes** concepts.

The application is intentionally kept simple so the focus is on understanding and demonstrating the infrastructure, deployment, networking, and auto-scaling aspects of a real-world application.

---

## 🚀 Project Overview

ShopSphere is a full-stack e-commerce application built with Next.js and PostgreSQL and deployed on a local Kubernetes cluster using Minikube.

The project demonstrates how a web application can be:

- Containerized with Docker
- Deployed and managed with Kubernetes
- Scaled horizontally based on CPU utilization
- Exposed through a Kubernetes Service
- Routed through an NGINX Ingress
- Configured using Kubernetes ConfigMaps
- Connected to PostgreSQL securely using Kubernetes Secrets
- Automatically recovered when Pods fail

The application uses a PostgreSQL database hosted on a Samsung S25 through Termux for the development environment.

---

## 🏗️ Architecture

```text
                         User / Browser
                              |
                              v
                    NGINX Ingress Controller
                              |
                              v
                    Kubernetes Service
                              |
              +---------------+---------------+
              |               |               |
              v               v               v
         ShopSphere       ShopSphere      ShopSphere
            Pod              Pod              Pod
              \               |               /
               \              |              /
                +-------------+-------------+
                              |
                              v
                    Samsung S25 PostgreSQL
```
## Auto-Scaling Architecture

```text
                    Incoming Traffic
                           |
                           v
                    Kubernetes Service
                           |
                           v
                  ShopSphere Deployment
                           |
              +------------+------------+
              |            |            |
            Pod 1        Pod 2        Pod 3
                           |
                           v
                    Metrics Server
                           |
                           v
                         HPA
                           |
              +------------+------------+
              |                         |
         Scale Up                    Scale Down
        3 → 4 → 5 → 6              6 → 5 → 2
