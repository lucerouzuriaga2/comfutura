import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, LogOut, Plus, Edit2, Trash2, 
  Layers, Briefcase, FileText, Loader2, Save, X, AlertCircle, CheckCircle2
} from "lucide-react";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  createdAt: string;
}

interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  client: string;
  image: string;
  category: string;
  technologies: string[];
  createdAt: string;
}

interface SectionItem {
  _id: string;
  key: string;
  title?: string;
  content?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export default function Admin() {
  // Authentication State
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [adminUser, setAdminUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Section Tab
  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "sections">("projects");

  // Data Lists State
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Form Management State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Shared Form Fields State
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    client: "",
    category: "",
    technologies: "",
    imageFile: null as File | null,
    currentImageUrl: "",
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    imageFile: null as File | null,
    currentImageUrl: "",
  });

  const [sectionForm, setSectionForm] = useState({
    key: "",
    title: "",
    content: "",
  });

  const API_BASE = "http://localhost:5000/api/v1";

  // Validate session on load
  useEffect(() => {
    if (token) {
      fetchAdminProfile();
    }
  }, [token]);

  // Fetch lists based on active tab
  useEffect(() => {
    if (token) {
      if (activeTab === "projects") fetchProjects();
      if (activeTab === "blogs") fetchBlogs();
      if (activeTab === "sections") fetchSections();
    }
  }, [token, activeTab]);

  // Auto-clear notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchAdminProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAdminUser(data.admin);
      } else {
        handleLogout();
      }
    } catch (err) {
      handleLogout();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Por favor complete todos los campos.");
      return;
    }

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        setAdminUser(data.admin);
        setNotification({ type: "success", message: "Sesión iniciada exitosamente." });
      } else {
        setLoginError(data.message || "Credenciales incorrectas.");
      }
    } catch (err) {
      setLoginError("No se pudo conectar con el backend en http://localhost:5000. Asegúrese de que esté encendido.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setAdminUser(null);
    setProjects([]);
    setBlogs([]);
    setSections([]);
  };

  // FETCH DATA METHODS
  const fetchProjects = async () => {
    setIsLoadingList(true);
    try {
      const res = await fetch(`${API_BASE}/projects`);
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      setNotification({ type: "error", message: "Error al cargar proyectos." });
    } finally {
      setIsLoadingList(false);
    }
  };

  const fetchBlogs = async () => {
    setIsLoadingList(true);
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      setNotification({ type: "error", message: "Error al cargar blogs." });
    } finally {
      setIsLoadingList(false);
    }
  };

  const fetchSections = async () => {
    setIsLoadingList(true);
    try {
      const res = await fetch(`${API_BASE}/sections`);
      const data = await res.json();
      if (data.success) setSections(data.data);
    } catch (err) {
      setNotification({ type: "error", message: "Error al cargar secciones." });
    } finally {
      setIsLoadingList(false);
    }
  };

  // DELETE METHODS
  const handleDelete = async (id: string, type: "projects" | "blogs" | "sections") => {
    if (!window.confirm("¿Está seguro de que desea eliminar este elemento de forma permanente?")) return;

    try {
      const endpoint = type === "sections" ? `${API_BASE}/sections/${id}` : `${API_BASE}/${type}/${id}`;
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setNotification({ type: "success", message: "Elemento eliminado exitosamente." });
        if (type === "projects") fetchProjects();
        if (type === "blogs") fetchBlogs();
        if (type === "sections") fetchSections();
      } else {
        setNotification({ type: "error", message: data.message || "Error al eliminar el elemento." });
      }
    } catch (err) {
      setNotification({ type: "error", message: "Error de red al intentar eliminar." });
    }
  };

  // FORM SETUP FOR CREATE / EDIT
  const openCreateForm = () => {
    setFormType("create");
    setEditingId(null);
    setFormError("");

    setProjectForm({ title: "", description: "", client: "", category: "", technologies: "", imageFile: null, currentImageUrl: "" });
    setBlogForm({ title: "", content: "", author: "", tags: "", imageFile: null, currentImageUrl: "" });
    setSectionForm({ key: "", title: "", content: "" });

    setIsFormOpen(true);
  };

  const openEditForm = (item: any) => {
    setFormType("edit");
    setEditingId(item._id);
    setFormError("");

    if (activeTab === "projects") {
      setProjectForm({
        title: item.title,
        description: item.description,
        client: item.client,
        category: item.category,
        technologies: item.technologies.join(", "),
        imageFile: null,
        currentImageUrl: item.image || "",
      });
    } else if (activeTab === "blogs") {
      setBlogForm({
        title: item.title,
        content: item.content,
        author: item.author,
        tags: item.tags.join(", "),
        imageFile: null,
        currentImageUrl: item.image || "",
      });
    } else if (activeTab === "sections") {
      setSectionForm({
        key: item.key,
        title: item.title || "",
        content: item.content || "",
      });
    }

    setIsFormOpen(true);
  };

  // SUBMIT HANDLERS
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      if (activeTab === "projects") {
        const formData = new FormData();
        formData.append("title", projectForm.title);
        formData.append("description", projectForm.description);
        formData.append("client", projectForm.client);
        formData.append("category", projectForm.category);
        formData.append("technologies", projectForm.technologies);
        if (projectForm.imageFile) {
          formData.append("image", projectForm.imageFile);
        } else if (formType === "create") {
          setFormError("La imagen de portada es obligatoria para un nuevo proyecto.");
          setIsSubmitting(false);
          return;
        }

        const url = formType === "create" 
          ? `${API_BASE}/projects` 
          : `${API_BASE}/projects/${editingId}`;

        const method = formType === "create" ? "POST" : "PUT";

        const res = await fetch(url, {
          method,
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          setNotification({ type: "success", message: `Proyecto ${formType === "create" ? "creado" : "actualizado"} exitosamente.` });
          setIsFormOpen(false);
          fetchProjects();
        } else {
          setFormError(data.message || "Error al guardar el proyecto.");
        }
      } else if (activeTab === "blogs") {
        const formData = new FormData();
        formData.append("title", blogForm.title);
        formData.append("content", blogForm.content);
        formData.append("author", blogForm.author);
        formData.append("tags", blogForm.tags);
        if (blogForm.imageFile) {
          formData.append("image", blogForm.imageFile);
        } else if (formType === "create") {
          setFormError("La imagen de portada es obligatoria para un nuevo artículo.");
          setIsSubmitting(false);
          return;
        }

        const url = formType === "create" 
          ? `${API_BASE}/blogs` 
          : `${API_BASE}/blogs/${editingId}`;

        const method = formType === "create" ? "POST" : "PUT";

        const res = await fetch(url, {
          method,
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          setNotification({ type: "success", message: `Artículo ${formType === "create" ? "creado" : "actualizado"} exitosamente.` });
          setIsFormOpen(false);
          fetchBlogs();
        } else {
          setFormError(data.message || "Error al guardar el artículo.");
        }
      } else if (activeTab === "sections") {
        if (!sectionForm.key.trim()) {
          setFormError("La clave única de sección es obligatoria.");
          setIsSubmitting(false);
          return;
        }

        const res = await fetch(`${API_BASE}/sections/${sectionForm.key}`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: sectionForm.title,
            content: sectionForm.content,
          }),
        });
        const data = await res.json();

        if (data.success) {
          setNotification({ type: "success", message: "Sección configurada exitosamente." });
          setIsFormOpen(false);
          fetchSections();
        } else {
          setFormError(data.message || "Error al configurar la sección.");
        }
      }
    } catch (err) {
      setFormError("Error de comunicación con el backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // LOGIN SCREEN RENDER (TEMA CLARO - FONDO BLANCO / GRIS CLARO)
  if (!token) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 px-4 py-20 min-h-[80vh]">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-red-light"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center justify-center gap-2">
              <LayoutDashboard className="text-brand-red" size={32} />
              ComFutura <span className="text-brand-red">SAC</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">Panel de Administración Principal</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-brand-red text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="admin@comfutura.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-brand-red hover:bg-brand-red-light disabled:bg-brand-red/50 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Iniciando sesión...
                </>
              ) : (
                "Acceder al Sistema"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} ComFutura S.A.C. Acceso Autorizado.
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD SCREEN RENDER (TEMA CLARO - FONDO BLANCO / GRIS CLARO)
  return (
    <div className="flex-1 bg-slate-50 min-h-[85vh] text-slate-800">
      {/* Notifications Bar */}
      {notification && (
        <div className={`fixed top-24 right-6 z-50 p-4 rounded-xl shadow-xl flex items-center gap-3 max-w-sm border transition-all animate-in fade-in slide-in-from-top-4 ${
          notification.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-red-50 border-red-150 text-brand-red"
        }`}>
          {notification.type === "success" ? <CheckCircle2 className="text-emerald-500" size={20} /> : <AlertCircle className="text-brand-red" size={20} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-white border-b border-slate-200 py-5 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2.5 rounded-xl text-brand-red border border-red-100">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Panel Administrativo</h1>
            <p className="text-xs text-slate-500">Sesión activa como: <span className="font-semibold text-slate-700">{adminUser?.name || "Administrador"}</span></p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 transition-all flex items-center gap-2 text-sm font-semibold cursor-pointer"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Tabs Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">Secciones del Backend</div>
            
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/10"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Briefcase size={18} />
              Proyectos del Portafolio
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/10"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <FileText size={18} />
              Artículos del Blog
            </button>

            <button
              onClick={() => setActiveTab("sections")}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "sections"
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/10"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Layers size={18} />
              Secciones del Sitio
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header Options */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 capitalize">
                  {activeTab === "projects" && "Proyectos del Portafolio"}
                  {activeTab === "blogs" && "Artículos del Blog"}
                  {activeTab === "sections" && "Configuración de Secciones"}
                </h2>
                <p className="text-sm text-slate-500">
                  {activeTab === "projects" && "Agrega, modifica o elimina proyectos del portafolio comercial."}
                  {activeTab === "blogs" && "Publica noticias, novedades y avances tecnológicos."}
                  {activeTab === "sections" && "Administra textos y títulos globales de secciones del sitio."}
                </p>
              </div>

              <button
                onClick={openCreateForm}
                className="bg-brand-red hover:bg-brand-red-light text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-md shadow-brand-red/10 transition-all cursor-pointer"
              >
                <Plus size={18} />
                {activeTab === "sections" ? "Configurar Sección" : "Agregar Nuevo"}
              </button>
            </div>

            {/* List Table Area */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              {isLoadingList ? (
                <div className="p-12 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
                  <Loader2 className="animate-spin text-brand-red" size={32} />
                  <p className="text-sm font-semibold">Cargando base de datos...</p>
                </div>
              ) : activeTab === "projects" && projects.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No hay proyectos registrados en la base de datos de MongoDB.</div>
              ) : activeTab === "blogs" && blogs.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No hay artículos de blog registrados en la base de datos de MongoDB.</div>
              ) : activeTab === "sections" && sections.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No hay secciones guardadas en la base de datos de MongoDB.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-4 px-6">Información</th>
                        <th className="py-4 px-6">
                          {activeTab === "projects" && "Cliente / Categoría"}
                          {activeTab === "blogs" && "Autor / Tags"}
                          {activeTab === "sections" && "Clave (Key)"}
                        </th>
                        <th className="py-4 px-6 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeTab === "projects" && projects.map((project) => (
                        <tr key={project._id} className="hover:bg-slate-50 transition-all text-sm">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {project.image && (
                                <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200" />
                              )}
                              <div>
                                <div className="font-bold text-slate-800">{project.title}</div>
                                <div className="text-xs text-slate-500 truncate max-w-md">{project.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-slate-700">{project.client}</div>
                            <div className="text-xs text-brand-red font-semibold">{project.category}</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openEditForm(project)}
                                className="bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 p-2 rounded-lg border border-slate-200 transition-all cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(project._id, "projects")}
                                className="bg-red-50 hover:bg-red-100 text-brand-red p-2 rounded-lg border border-red-100 transition-all cursor-pointer"
                                title="Eliminar"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "blogs" && blogs.map((blog) => (
                        <tr key={blog._id} className="hover:bg-slate-50 transition-all text-sm">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {blog.image && (
                                <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200" />
                              )}
                              <div>
                                <div className="font-bold text-slate-800">{blog.title}</div>
                                <div className="text-xs text-slate-400 mt-1">
                                  Enlace: <span className="text-brand-red hover:underline font-mono">comfutura.com/blog/{blog.slug}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-slate-700">{blog.author}</div>
                            <div className="text-xs text-slate-500">{blog.tags.join(", ")}</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openEditForm(blog)}
                                className="bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 p-2 rounded-lg border border-slate-200 transition-all cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(blog._id, "blogs")}
                                className="bg-red-50 hover:bg-red-100 text-brand-red p-2 rounded-lg border border-red-100 transition-all cursor-pointer"
                                title="Eliminar"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {activeTab === "sections" && sections.map((sec) => (
                        <tr key={sec._id} className="hover:bg-slate-50 transition-all text-sm">
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-800">{sec.title || "(Sin Título)"}</div>
                            <div className="text-xs text-slate-500 truncate max-w-md">{sec.content || "(Sin Contenido)"}</div>
                          </td>
                          <td className="py-4 px-6">
                            <code className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-xs text-brand-red font-mono font-semibold">{sec.key}</code>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openEditForm(sec)}
                                className="bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 p-2 rounded-lg border border-slate-200 transition-all cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(sec.key, "sections")}
                                className="bg-red-50 hover:bg-red-100 text-brand-red p-2 rounded-lg border border-red-100 transition-all cursor-pointer"
                                title="Eliminar"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* CREATE/EDIT FORM MODAL (TEMA CLARO) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl relative my-8 text-slate-800">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 capitalize">
                  {formType === "create" ? "Agregar" : "Editar"} {activeTab === "projects" && "Proyecto"} {activeTab === "blogs" && "Artículo"} {activeTab === "sections" && "Sección"}
                </h3>
                <p className="text-xs text-slate-500">Complete todos los datos necesarios para guardar en MongoDB.</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="bg-slate-50 hover:bg-slate-100 text-slate-500 p-2 rounded-xl border border-slate-200 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-brand-red text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* PROJECTS FORM FIELDS */}
              {activeTab === "projects" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Título del Proyecto</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Cliente</label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Categoría</label>
                      <input
                        type="text"
                        placeholder="Ej. Fibra Óptica, Telecomunicaciones"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tecnologías (separadas por comas)</label>
                      <input
                        type="text"
                        placeholder="Ej. Cisco, OTDR, GPON"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Descripción</label>
                    <textarea
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Imagen de Portada {formType === "edit" && <span className="text-slate-400 text-[10px] uppercase font-normal">(Opcional si no desea cambiar)</span>}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProjectForm({ ...projectForm, imageFile: e.target.files ? e.target.files[0] : null })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-600 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-red file:text-white hover:file:bg-brand-red-light file:cursor-pointer transition-all border-dashed"
                      required={formType === "create"}
                    />
                    {(projectForm.imageFile || projectForm.currentImageUrl) && (
                      <div className="mt-3 flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <img
                          src={projectForm.imageFile ? URL.createObjectURL(projectForm.imageFile) : projectForm.currentImageUrl}
                          alt="Previsualización de Proyecto"
                          className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-slate-700 block">
                            {projectForm.imageFile ? "Nueva imagen seleccionada:" : "Imagen actual en MongoDB:"}
                          </span>
                          <span className="text-slate-500 truncate block max-w-[320px]">
                            {projectForm.imageFile ? projectForm.imageFile.name : projectForm.currentImageUrl}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* BLOGS FORM FIELDS */}
              {activeTab === "blogs" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Título del Artículo</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Autor</label>
                      <input
                        type="text"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tags (separados por comas)</label>
                    <input
                      type="text"
                      placeholder="Ej. Redes, 5G, Tecnología"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contenido del Artículo</label>
                    <textarea
                      rows={5}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none font-mono text-sm"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Imagen de Portada {formType === "edit" && <span className="text-slate-400 text-[10px] uppercase font-normal">(Opcional si no desea cambiar)</span>}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBlogForm({ ...blogForm, imageFile: e.target.files ? e.target.files[0] : null })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-600 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-red file:text-white hover:file:bg-brand-red-light file:cursor-pointer transition-all border-dashed"
                      required={formType === "create"}
                    />
                    {(blogForm.imageFile || blogForm.currentImageUrl) && (
                      <div className="mt-3 flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <img
                          src={blogForm.imageFile ? URL.createObjectURL(blogForm.imageFile) : blogForm.currentImageUrl}
                          alt="Previsualización de Blog"
                          className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-slate-700 block">
                            {blogForm.imageFile ? "Nueva imagen seleccionada:" : "Imagen actual en MongoDB:"}
                          </span>
                          <span className="text-slate-500 truncate block max-w-[320px]">
                            {blogForm.imageFile ? blogForm.imageFile.name : blogForm.currentImageUrl}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* SECTIONS FORM FIELDS */}
              {activeTab === "sections" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Clave Única (Key)</label>
                    <input
                      type="text"
                      placeholder="Ej. hero_title, about_content"
                      value={sectionForm.key}
                      onChange={(e) => setSectionForm({ ...sectionForm, key: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all font-mono disabled:opacity-50 disabled:bg-slate-50"
                      disabled={formType === "edit"}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Título de la Sección</label>
                    <input
                      type="text"
                      value={sectionForm.title}
                      onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contenido de la Sección</label>
                    <textarea
                      rows={4}
                      value={sectionForm.content}
                      onChange={(e) => setSectionForm({ ...sectionForm, content: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all resize-none"
                    ></textarea>
                  </div>
                </>
              )}

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-5 py-3 rounded-xl text-sm font-semibold border border-slate-200 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-red hover:bg-brand-red-light disabled:bg-brand-red/50 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {formType === "edit" ? "Guardar Cambios" : (
                        activeTab === "blogs" ? "Publicar Artículo" :
                        activeTab === "projects" ? "Publicar Proyecto" : "Guardar Configuración"
                      )}
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
