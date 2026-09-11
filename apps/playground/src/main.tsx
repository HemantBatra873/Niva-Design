import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@enterprise/design-tokens/css';
import '@enterprise/component-library/styles.css';
import {
  // Primitives & Components
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  Alert, AlertDescription, AlertTitle,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  Avatar, AvatarFallback, AvatarImage,
  Badge,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
  Bubble, BubbleContent, BubbleGroup,
  Button, ButtonGroup,
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Checkbox,
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
  HoverCard, HoverCardContent, HoverCardTrigger,
  Input,
  InputOTP, InputOTPGroup, InputOTPSlot,
  Kbd, Label,
  Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader, MessageGroup,
  NativeSelect, NativeSelectOption,
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
  Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger,
  Progress,
  RadioGroup, RadioGroupItem,
  ScrollArea,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Separator,
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
  Skeleton, Slider, Spinner, Switch,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Textarea,
  Toggle, ToggleGroup, ToggleGroupItem,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
  // Global Shared Layout Components
  Header, Footer, AppSidebar, Hero, PageHeader, AppShell,
  // Icons
  Bell, Box, CheckCircle2, FileText, FolderOpen, Info, Plus, Search,
  ChevronRight, ExternalLink, Sparkles, Sliders, Database, FormInput,
  LayoutDashboard, Layers, MessageSquare, Shield, ShieldAlert, ShieldCheck,
  Cpu, ArrowRight, Check, Copy, Terminal,
} from '@enterprise/component-library';
import './playground.css';

// Catalog registry grouping every UI component
const catalogIndex = {
  'Global Shared Layout': [
    { name: 'Header', desc: 'Global top navigation with search, themes, and profile' },
    { name: 'Footer', desc: 'Enterprise footer with multi-column links and copyright' },
    { name: 'AppSidebar', desc: 'Collapsible navigation sidebar with badges and groups' },
    { name: 'Hero', desc: 'High-impact enterprise hero banner with CTAs and metrics' },
    { name: 'PageHeader', desc: 'Structured page title with breadcrumbs and actions' },
    { name: 'AppShell', desc: 'Complete layout frame assembling Header, Sidebar, Content, Footer' },
  ],
  'Form Controls & Inputs': [
    { name: 'Button', desc: 'Policy buttons with primary, secondary, tertiary, danger variants' },
    { name: 'ButtonGroup', desc: 'Segmented button sets for filters and time periods' },
    { name: 'Input', desc: 'Single-line text inputs with tokenized borders and focus states' },
    { name: 'Textarea', desc: 'Multi-line expandable text area' },
    { name: 'Checkbox', desc: 'Accessible boolean selection control' },
    { name: 'RadioGroup', desc: 'Mutually exclusive single-choice option group' },
    { name: 'Switch', desc: 'High-visibility boolean toggle switch' },
    { name: 'Select', desc: 'Custom floating option select picker' },
    { name: 'NativeSelect', desc: 'High-performance native browser select dropdown' },
    { name: 'Slider', desc: 'Continuous and stepped range slider control' },
    { name: 'Toggle', desc: 'Two-state button for formatting and active preferences' },
    { name: 'ToggleGroup', desc: 'Grouped toggle buttons with single or multiple select' },
    { name: 'InputOTP', desc: 'One-time passcode pin input slots' },
    { name: 'Label', desc: 'Accessible form control title with semantic association' },
  ],
  'Data Display & Feedback': [
    { name: 'Card', desc: 'Structured surface card with header, content, and footer' },
    { name: 'Badge', desc: 'Visual status indicator tags with multiple variant styles' },
    { name: 'Alert', desc: 'Contextual notification banners for success, info, warning, danger' },
    { name: 'Table', desc: 'Tabular data grid with sticky headers and bordered rows' },
    { name: 'Progress', desc: 'Visual progress meter for workflows and loading jobs' },
    { name: 'Spinner', desc: 'Indeterminate loading activity indicator' },
    { name: 'Skeleton', desc: 'Content placeholder shimmer for loading states' },
    { name: 'Avatar', desc: 'User profile representation with image and fallback initials' },
    { name: 'Empty', desc: 'Standardized empty state illustration and action container' },
    { name: 'Kbd', desc: 'Keyboard shortcut indicator badge' },
  ],
  'Overlays & Dialogs': [
    { name: 'Dialog', desc: 'Modal dialog overlay for focused confirmations and forms' },
    { name: 'AlertDialog', desc: 'High-urgency confirmation dialog for destructive actions' },
    { name: 'Sheet', desc: 'Slide-in side drawer panel for secondary configuration' },
    { name: 'Popover', desc: 'Rich floating popover content attached to a trigger' },
    { name: 'Tooltip', desc: 'Lightweight context tooltip on hover or keyboard focus' },
    { name: 'HoverCard', desc: 'Preview card appearing on pointer hover' },
    { name: 'DropdownMenu', desc: 'Action menu popover for user profiles and item actions' },
  ],
  'Navigation & Layout': [
    { name: 'Tabs', desc: 'Categorized content panel switcher with keyboard navigation' },
    { name: 'Accordion', desc: 'Vertically stacked collapsible disclosure panels' },
    { name: 'Breadcrumb', desc: 'Hierarchical navigation path indicators' },
    { name: 'Pagination', desc: 'Multi-page navigation controls with previous, next, ellipsis' },
    { name: 'Collapsible', desc: 'Simple show/hide disclosure container' },
    { name: 'Separator', desc: 'Horizontal and vertical visual divider lines' },
    { name: 'ScrollArea', desc: 'Custom styled scrollable container' },
  ],
  'Chat & Messaging': [
    { name: 'Message', desc: 'Chat message container with alignment and metadata' },
    { name: 'MessageAvatar', desc: 'Avatar associated with message sender' },
    { name: 'MessageContent', desc: 'Content area for message payloads' },
    { name: 'Bubble', desc: 'Chat bubble with variant styling and rounded tails' },
    { name: 'BubbleGroup', desc: 'Stacked message bubbles from the same participant' },
  ],
};

function Section({ id, title, description, badge = 'Live Primitive', children }: { id?: string; title: string; description: string; badge?: string; children: React.ReactNode }) {
  return (
    <section className="playground-section" id={id || title.toLowerCase().replaceAll(' ', '-')}>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary">
          {badge}
        </Badge>
      </div>
      <div className="showcase">{children}</div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [query, setQuery] = useState('');
  const [sliderVal, setSliderVal] = useState(65);
  const [otpVal, setOtpVal] = useState('4829');

  const filteredCatalog = useMemo(() => {
    return Object.entries(catalogIndex).map(([group, items]) => ({
      group,
      items: items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase())),
    })).filter(g => g.items.length > 0);
  }, [query]);

  return (
    <TooltipProvider>
      <AppShell
        title="Enterprise Design System"
        currentTheme={theme}
        onThemeChange={setTheme}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="playground-shell">
          {/* Main Page Header */}
          <PageHeader
            title="Enterprise Component Platform & Verification Workbench"
            description="Comprehensive testing environment verifying DTCG design tokens, global layout shells, and 60+ accessible component primitives across 4 themes."
            breadcrumbs={[{ label: 'Enterprise Design System', href: '#' }, { label: 'Interactive Playground' }]}
            actions={
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setActiveTab('tokens')} className="gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Tokens
                </Button>
                <Button size="sm" onClick={() => setActiveTab('catalog')} className="gap-1">
                  <Search className="h-3.5 w-3.5" /> All Components
                </Button>
              </div>
            }
          />

          {/* Enterprise Hero Banner */}
          <Hero
            title="Enterprise-Grade Component Infrastructure"
            subtitle="Explore standardized, accessible UI primitives styled with DTCG-inspired design tokens. Seamlessly switch between Light, Dark, High-Contrast Light, and High-Contrast Dark themes."
            onExploreClick={() => setActiveTab('form-controls')}
            onDocsClick={() => setActiveTab('tokens')}
          />

          {/* SECTION 1: GLOBAL SHARED LAYOUT */}
          {(activeTab === 'dashboard' || activeTab === 'layout-components') && (
            <Section
              id="layout-components"
              title="Global Shared Layout Components"
              description="High-level production-ready components that structure entire enterprise applications."
              badge="layout/*"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" /> Header & Footer
                    </CardTitle>
                    <CardDescription>Enterprise branding, global search, theme switcher, and multi-tier footer.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <p className="text-muted-foreground">
                      The <Kbd>Header</Kbd> integrates with the token switcher, user dropdown, and notifications. The <Kbd>Footer</Kbd> provides legal, product, and status links.
                    </p>
                    <div className="p-3 bg-muted/40 rounded-lg border border-border flex items-center justify-between">
                      <span className="font-semibold">Live Theme: {theme.toUpperCase()}</span>
                      <Badge variant="outline">Verified Token Scoping</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4 text-primary" /> AppSidebar & AppShell
                    </CardTitle>
                    <CardDescription>Collapsible navigation drawer and complete responsive application frame.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <p className="text-muted-foreground">
                      <Kbd>AppSidebar</Kbd> supports collapsed icon-only mode, categorization badges, and active route states. Wrapped seamlessly by <Kbd>AppShell</Kbd>.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => setActiveTab('form-controls')}>Test Forms</Button>
                      <Button size="sm" variant="secondary" onClick={() => setActiveTab('overlays')}>Test Overlays</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>
          )}

          {/* SECTION 2: FORM CONTROLS & INPUTS */}
          {(activeTab === 'dashboard' || activeTab === 'form-controls') && (
            <Section
              id="form-controls"
              title="Form Controls & Inputs"
              description="Form primitives with focus rings, error states, and keyboard accessibility."
              badge="14 Primitives"
            >
              <div className="form-grid">
                {/* Column 1: Buttons & Toggles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Button & ButtonGroup</CardTitle>
                    <CardDescription>Enterprise policy variants</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Button>Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="tertiary">Tertiary</Button>
                      <Button variant="danger">Danger</Button>
                      <Button loading>Saving</Button>
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">ButtonGroup Filter</Label>
                      <ButtonGroup>
                        <Button size="sm">Day</Button>
                        <Button size="sm" variant="secondary">Week</Button>
                        <Button size="sm" variant="secondary">Month</Button>
                      </ButtonGroup>
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Toggle & ToggleGroup</Label>
                      <ToggleGroup defaultValue={["bold"]}>
                        <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
                        <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </CardContent>
                </Card>

                {/* Column 2: Text Inputs & Selects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Inputs & Select Pickers</CardTitle>
                    <CardDescription>Text inputs, native and custom selects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="demo-email">Work Email</Label>
                      <Input id="demo-email" type="email" placeholder="alex@enterprise.com" />
                    </div>
                    <div className="space-y-1">
                      <Label>Custom Select</Label>
                      <Select defaultValue="us-east">
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                          <SelectItem value="us-west">US West (Oregon)</SelectItem>
                          <SelectItem value="eu-central">EU (Frankfurt)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>NativeSelect</Label>
                      <NativeSelect defaultValue="high">
                        <NativeSelectOption value="low">Low Priority</NativeSelectOption>
                        <NativeSelectOption value="normal">Normal Priority</NativeSelectOption>
                        <NativeSelectOption value="high">High Priority</NativeSelectOption>
                        <NativeSelectOption value="critical">Critical / Blocker</NativeSelectOption>
                      </NativeSelect>
                    </div>
                  </CardContent>
                </Card>

                {/* Column 3: Selection, Slider, OTP */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Booleans, Sliders & OTP</CardTitle>
                    <CardDescription>Switches, Checkboxes, and PIN inputs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="choice flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
                      <span>Require MFA authorization ({checked ? 'Active' : 'Off'})</span>
                    </label>
                    <label className="choice flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <Switch checked={enabled} onCheckedChange={setEnabled} />
                      <span>Automated tenant failover</span>
                    </label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <Label>Threshold Allocation</Label>
                        <span className="font-mono text-muted-foreground">{sliderVal}%</span>
                      </div>
                      <Slider defaultValue={[sliderVal]} max={100} step={5} onValueChange={(v) => setSliderVal(Array.isArray(v) ? v[0] : Number(v))} />
                    </div>
                    <div className="space-y-1">
                      <Label>InputOTP Security PIN</Label>
                      <InputOTP maxLength={4} value={otpVal} onChange={setOtpVal}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>
          )}

          {/* SECTION 3: DATA DISPLAY & FEEDBACK */}
          {(activeTab === 'dashboard' || activeTab === 'data-display') && (
            <Section
              id="data-display"
              title="Data Display & Feedback"
              description="Cards, status badges, alert banners, tables, and progress indicators."
              badge="10 Primitives"
            >
              <div className="data-grid">
                {/* Status & Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Cluster Health & Badges
                    </CardTitle>
                    <CardDescription>Real-time node telemetry</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge>Operational</Badge>
                      <Badge variant="secondary">v2.4 LTS</Badge>
                      <Badge variant="outline">FIPS 140-2</Badge>
                      <Badge variant="destructive">2 Warning</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Provisioning Storage</span>
                        <span className="font-mono">84%</span>
                      </div>
                      <Progress value={84} />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Spinner />
                      <Skeleton className="h-4 w-44" />
                    </div>
                  </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Table Primitive</CardTitle>
                    <CardDescription>Enterprise data grid with borders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Latency</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Core Auth API</TableCell>
                          <TableCell className="font-mono text-xs">18ms</TableCell>
                          <TableCell><Badge>Healthy</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Event Stream</TableCell>
                          <TableCell className="font-mono text-xs">42ms</TableCell>
                          <TableCell><Badge variant="secondary">Syncing</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Billing Portal</TableCell>
                          <TableCell className="font-mono text-xs">26ms</TableCell>
                          <TableCell><Badge>Healthy</Badge></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Alerts & Empty State */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Alerts & Empty States</CardTitle>
                    <CardDescription>Contextual messaging and fallbacks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>All Token Aliases Resolved</AlertTitle>
                      <AlertDescription>Primitives and semantic color overrides compiled successfully.</AlertDescription>
                    </Alert>
                    <Empty className="py-4 border rounded-lg">
                      <EmptyHeader>
                        <EmptyMedia variant="icon"><FolderOpen className="h-5 w-5" /></EmptyMedia>
                        <EmptyTitle className="text-xs">No Archived Artifacts</EmptyTitle>
                        <EmptyDescription className="text-[11px]">All system logs are stored in live cold storage.</EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </CardContent>
                </Card>
              </div>
            </Section>
          )}

          {/* SECTION 4: OVERLAYS & DIALOGS */}
          {(activeTab === 'dashboard' || activeTab === 'overlays') && (
            <Section
              id="overlays"
              title="Overlays, Dialogs & Flyouts"
              description="Accessible modal dialogs, slide-in sheets, popovers, and tooltips."
              badge="7 Primitives"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Modal Dialog */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs">Dialog</CardTitle>
                    <CardDescription>Standard modal window</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger render={<Button className="w-full" size="sm">Open Dialog</Button>} />
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Deploy Enterprise Release</DialogTitle>
                          <DialogDescription>
                            This will promote release v2.4 to the multi-region production cluster.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-2 text-xs text-muted-foreground">
                          Target environment: <span className="font-semibold text-foreground">AWS us-east-1 + eu-west-1</span>
                        </div>
                        <DialogFooter>
                          <Button variant="secondary">Cancel</Button>
                          <Button>Confirm Deployment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Alert Dialog */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs">AlertDialog</CardTitle>
                    <CardDescription>Destructive confirmation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AlertDialog>
                      <AlertDialogTrigger render={<Button variant="danger" className="w-full" size="sm">Delete Cluster</Button>} />
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently destroy cluster <Kbd>prod-core-01</Kbd> and its volumes.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Yes, delete cluster
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>

                {/* Sheet / Drawer */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs">Sheet (Slide-in Drawer)</CardTitle>
                    <CardDescription>Side panel flyout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Sheet>
                      <SheetTrigger render={<Button variant="secondary" className="w-full" size="sm">Open Drawer</Button>} />
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Environment Settings</SheetTitle>
                          <SheetDescription>Configure parameters for tenant runtime isolation.</SheetDescription>
                        </SheetHeader>
                        <div className="p-4 space-y-3 text-xs">
                          <Label>Max Concurrency</Label>
                          <Input defaultValue="2500" />
                          <Label>Heartbeat Timeout (ms)</Label>
                          <Input defaultValue="30000" />
                        </div>
                        <SheetFooter>
                          <SheetClose render={<Button className="w-full">Apply Changes</Button>} />
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>

                {/* Popover & Tooltip */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs">Popover & Tooltips</CardTitle>
                    <CardDescription>Floating contextual panels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Popover>
                      <PopoverTrigger render={<Button variant="tertiary" size="sm" className="w-full">Open Popover</Button>} />
                      <PopoverContent>
                        <PopoverHeader>
                          <PopoverTitle className="text-xs font-semibold">Token Reference</PopoverTitle>
                          <PopoverDescription className="text-[11px]">
                            Values dynamically change when toggling Light / Dark mode.
                          </PopoverDescription>
                        </PopoverHeader>
                      </PopoverContent>
                    </Popover>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Tooltip>
                        <TooltipTrigger render={<Button size="icon" variant="ghost" aria-label="Info"><Info className="h-4 w-4" /></Button>} />
                        <TooltipContent>WCAG 2.1 AA accessible tooltip</TooltipContent>
                      </Tooltip>
                      <HoverCard>
                        <HoverCardTrigger render={<Button size="sm" variant="ghost" className="text-xs">HoverCard</Button>} />
                        <HoverCardContent className="text-xs">
                          Enterprise policy: All components adhere to strict token hierarchies.
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>
          )}

          {/* SECTION 5: NAVIGATION & DISCLOSURE */}
          {(activeTab === 'dashboard' || activeTab === 'navigation') && (
            <Section
              id="navigation"
              title="Navigation & Progressive Disclosure"
              description="Tabs, Accordions, Breadcrumbs, and Pagination controls."
              badge="7 Primitives"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tabs & Breadcrumb */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Breadcrumbs & Segmented Tabs</CardTitle>
                    <CardDescription>Deep hierarchy navigation and in-page tabs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="#">Infrastructure</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbLink href="#">Clusters</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Production West</BreadcrumbPage></BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                    <Separator />
                    <Tabs defaultValue="architecture">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="architecture">Architecture</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      </TabsList>
                      <TabsContent value="architecture" className="text-xs text-muted-foreground pt-2">
                        Distributed multi-package monorepo separating design tokens from consumer components.
                      </TabsContent>
                      <TabsContent value="security" className="text-xs text-muted-foreground pt-2">
                        Zero external runtime tracking; Radix and Base UI handle focus traps.
                      </TabsContent>
                      <TabsContent value="metrics" className="text-xs text-muted-foreground pt-2">
                        Build time &lt; 1s via Tailwind CSS v4 lightning engine.
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Accordion & Pagination */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Accordion & Pagination</CardTitle>
                    <CardDescription>Collapsible panels and page steppers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion>
                      <AccordionItem value="faq-1">
                        <AccordionTrigger>How does multi-theme compilation work?</AccordionTrigger>
                        <AccordionContent>
                          The build script merges primitives, semantic overrides, and component tokens into individual CSS theme scopes (:root, [data-theme="dark"], [data-theme="hc-light"], [data-theme="hc-dark"]).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2">
                        <AccordionTrigger>How are tokens consumed downstream?</AccordionTrigger>
                        <AccordionContent>
                          Components reference semantic CSS variables (e.g. var(--semantic-color-action-primary)), guaranteeing full reactivity when data-theme attributes change.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Separator />
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                        <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                        <PaginationItem><PaginationNext href="#" /></PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardContent>
                </Card>
              </div>
            </Section>
          )}

          {/* SECTION 6: CHAT & MESSAGING */}
          {(activeTab === 'dashboard' || activeTab === 'messaging') && (
            <Section
              id="messaging"
              title="Chat & Messaging Primitives"
              description="Message bubbles, groups, and avatar alignments for collaboration workflows."
              badge="Message / Bubble"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" /> Enterprise Chat Stream
                  </CardTitle>
                  <CardDescription>Communication threads with message bubbles</CardDescription>
                </CardHeader>
                <CardContent>
                  <MessageGroup className="max-w-xl space-y-3">
                    <Message align="start">
                      <MessageAvatar>
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-muted">AI</AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                      <MessageContent>
                        <MessageHeader>System Bot • Just now</MessageHeader>
                        <Bubble variant="default">
                          <BubbleContent>
                            Theme updated to <strong>{theme}</strong>. All 60+ components have re-rendered with active CSS custom properties.
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>

                    <Message align="end">
                      <MessageContent>
                        <MessageHeader className="justify-end">Admin User • Just now</MessageHeader>
                        <Bubble variant="secondary">
                          <BubbleContent>
                            Verified! Both Light, Dark, and High-Contrast modes are completely synchronized.
                          </BubbleContent>
                        </Bubble>
                        <MessageFooter className="justify-end text-[10px]">Delivered & Encrypted</MessageFooter>
                      </MessageContent>
                    </Message>
                  </MessageGroup>
                </CardContent>
              </Card>
            </Section>
          )}

          {/* SECTION 7: DESIGN TOKENS CATALOG */}
          {(activeTab === 'dashboard' || activeTab === 'tokens') && (
            <Section
              id="tokens"
              title="Design Tokens Scale"
              description="Primitives and semantic mappings generated by @enterprise/design-tokens."
              badge="DTCG Token Engine"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Brand & Slate Palette */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Color Primitives</CardTitle>
                    <CardDescription>Primary blue & neutral slate scales</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex h-8 w-full rounded overflow-hidden shadow-xs">
                      <div className="flex-1 bg-blue-100" title="blue-100" />
                      <div className="flex-1 bg-blue-300" title="blue-300" />
                      <div className="flex-1 bg-blue-500" title="blue-500" />
                      <div className="flex-1 bg-blue-700" title="blue-700" />
                      <div className="flex-1 bg-blue-900" title="blue-900" />
                    </div>
                    <div className="flex h-8 w-full rounded overflow-hidden shadow-xs">
                      <div className="flex-1 bg-slate-100" title="slate-100" />
                      <div className="flex-1 bg-slate-300" title="slate-300" />
                      <div className="flex-1 bg-slate-500" title="slate-500" />
                      <div className="flex-1 bg-slate-700" title="slate-700" />
                      <div className="flex-1 bg-slate-900" title="slate-900" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">Tokens mapped from <Kbd>src/primitives/colors.json</Kbd></p>
                  </CardContent>
                </Card>

                {/* Spacing & Radii */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Spacing & Radius</CardTitle>
                    <CardDescription>8pt grid and border radii</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-muted-foreground font-mono">sm:</span>
                      <div className="h-4 bg-primary/20 border border-primary/40 rounded-sm w-8" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-muted-foreground font-mono">md:</span>
                      <div className="h-4 bg-primary/20 border border-primary/40 rounded-md w-16" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-muted-foreground font-mono">lg:</span>
                      <div className="h-4 bg-primary/20 border border-primary/40 rounded-lg w-24" />
                    </div>
                  </CardContent>
                </Card>

                {/* Available Themes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Theme Variants</CardTitle>
                    <CardDescription>Generated CSS theme selectors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between p-1.5 rounded bg-muted/40">
                      <span className="font-semibold">:root, [data-theme="light"]</span>
                      <Badge variant="outline">Default</Badge>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-muted/40">
                      <span className="font-semibold">[data-theme="dark"]</span>
                      <Badge variant="secondary">Dark</Badge>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-muted/40">
                      <span className="font-semibold">[data-theme="hc-dark"]</span>
                      <Badge variant="secondary">A11y High Contrast</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>
          )}

          {/* SECTION 8: ALL COMPONENTS CATALOG REGISTRY */}
          {(activeTab === 'dashboard' || activeTab === 'catalog') && (
            <Section
              id="catalog"
              title="Complete 60+ Component Catalog"
              description="Filter through all exported primitives and layout modules in @enterprise/component-library."
              badge="Searchable Catalog"
            >
              <div className="catalog-toolbar mb-4 flex items-center gap-2 max-w-md">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter components (e.g. Button, Dialog, Sheet)..."
                />
              </div>

              <div className="catalog-grid">
                {filteredCatalog.map(({ group, items }) => (
                  <Card key={group}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{group}</CardTitle>
                      <CardDescription className="text-xs">{items.length} components</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {items.map((item) => (
                        <div key={item.name} className="p-2 rounded bg-muted/30 border border-border/50 text-xs">
                          <div className="flex items-center justify-between font-semibold text-foreground">
                            <span>{item.name}</span>
                            <Badge variant="outline" className="text-[10px] px-1 py-0 font-mono">
                              Exported
                            </Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          )}
        </div>
      </AppShell>
    </TooltipProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
